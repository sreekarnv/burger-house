const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');

// To sign and return a token
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
}

// verify token and return decoded data
const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME })
}

const generateCookie = (req, res, token) => {
    res.cookie('burgerHouse', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        secure: (req.secure || req.headers('x-forwarded-proto') === 'https'),
        httpOnly: true,
    })
}

exports.LogoutUsers = async (req, res, next) => {
    try {
        generateCookie(req, res, null);

        res.status(200).json({
            status: 'success',
            user: null
        })

    } catch (err) {
        next(err);
    }
}

exports.RegisterUsers = async (req, res, next) => {
    try {
        // 1.  Create User
        const { name, email, password, passwordConfirm } = req.body;

        const user = await User.create({ name, email, password, passwordConfirm })


        // 3. remove password from output
        user.password = undefined;
        user.passwordChangedAt = undefined;

        res.status(201).json({
            status: 'success',
            user
        })
    } catch (err) {
        next(err);
    }
}


exports.LoginUsers = async (req, res, next) => {
    try {
        // 1. get login details
        const { email, password } = req.body;

        // 2. check if email / password are provided
        if (!email || !password) {
            return next(new AppError('Please Provide Email or Password'))
        }

        const user = await User.findOne({ email }).select('+password')


        // 2. check password
        if (!user || !(await user.checkPassword(password, user.password))) {
            next(new AppError('Invalid Email or Password', 401))
        }

        // 3. send JWT token
        const token = await signToken(user._id);

        generateCookie(req, res, token);

        user.password = undefined;
        user.passwordChangedAt = undefined;

        // 4. login user
        res.status(200).json({
            token,
            status: 'success',
            user
        })

    } catch (err) {
        next(err);
    }
}

exports.checkIsLoggedIn = async (req, res, next) => {
    try {
        // 1. get Authtoken and check if it exists
        let token = req.cookies.burgerHouse;
        if (token) {
            if (!token) {
                return next();
            }
            // 2. Verfiy and get decoded values
            const decodedToken = await verifyToken(token);

            // 3. Get User and check if user exists
            const user = await User.findById(decodedToken.id);

            if (!user) {
                return next()
            }

            // 4. Check if payload was changed after token was issued
            if (await user.changedPassword(decodedToken.iat)) {
                return next();
            }

            user.__v = undefined;
            user.password = undefined;
            user.passwordChangedAt = undefined;

            // 5. Grant access
            res.status(200).json({
                status: 'success',
                user
            })
        }
    } catch (err) {
        next()
    }
}



exports.protectRoutes = async (req, res, next) => {
    try {
        // 1. get Authtoken and check if it exists
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.burgerHouse) {
            token = req.cookies.burgerHouse
        }

        if (!token) {
            return next(
                new AppError('You are not logged in! Please login to get access', 401)
            )
        }

        // 2. Verfiy and get decoded values
        const decodedToken = await verifyToken(token);

        // 3. Get User and check if user exists
        const user = await User.findById(decodedToken.id).select('+password').select('+passwordChangedAt');

        if (!user) {
            return next(new AppError('User does Not Exists', 404))
        }

        // 4. Check if payload was changed after token was issued
        if (await user.changedPassword(decodedToken.iat)) {
            return next(new AppError('User recently changed password! Please Login again!', 401));
        }

        // 5. Grant access
        req.user = user;
        next();

    } catch (err) {
        next(err)
    }
}


exports.restrictRoutes = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.find(role => role === req.user.role)) {
                return next(new AppError('You are not authorized', 403))
            }
            next();

        } catch (err) {
            next(err);
        }
    }
}


exports.updateCurrentUserPassword = async (req, res, next) => {
    try {
        // 1. get user
        const user = req.user;

        // 2. get payload => passwordCurrent, password, passwordConfirm
        const payload = {};
        Object.keys(req.body).forEach(field => {
            if (field === 'passwordCurrent' || field === 'password' || field === 'passwordConfirm') {
                payload[field] = req.body[field]
            }
            return payload;
        })

        // 6. verify prev password
        if (!await user.checkPassword(payload.passwordCurrent, user.password)) {
            return next(new AppError('Invalid Password. Please try again', 400))
        }

        // 7. update password
        user.password = payload.password;
        user.passwordConfirm = payload.passwordConfirm;
        user.passwordChangedAt = Date.now();
        await user.save();

        user.password = undefined;

        res.status(200).json({
            status: 'success'
        })

    } catch (err) {
        next(err);
    }
}

