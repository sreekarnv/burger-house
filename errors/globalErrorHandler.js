const AppError = require('./AppError')

// Handling Cast Errors
const handleCastError = err => {
    const message = `Invalid value ${err.value} on path ${err.path}`
    return new AppError(message, 400)
}

// Handling Validation Errors
const handleValidationError = err => {
    let message = Object.keys(err.errors).map(field => err.errors[field].properties[0] ? `${err.errors[field].properties[0]} ` : ` ${err.errors[field].properties.message}`);
    return new AppError(message, 400)
}

// Handling Duplicate Field Value Errors
const handleDuplicateKeyError = err => {
    let message = Object.keys(err.keyValue).map(field => `value ${err.keyValue[field]} for field ${field} already exists.`)
    return new AppError(message, 400);
}

// Handling JsonWebTokenErrors
const handleJsonWebTokenError = () => {
    let message = `You are not logged in.`
    return new AppError(message, 401);
}

// Handling TokenExpiredErrors
const handleTokenExpiredError = () => {
    let message = `Your session has expired. Please login to get access`;
    return new AppError(message, 401);
}


// Handling Errors in Production mode
const ProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try later'
        })
    }
}


// Handling Errors in Development Mode
const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        name: err.name,
        error: { ...err }
    });
}


// Global Error Handling Controller
module.exports = (err, req, res, next) => {
    console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV === 'production') {
        devError(err, res);
    }
    // else if (process.env.NODE_ENV === 'production') {
    else if (process.env.NODE_ENV === 'development') {
        let error = { ...err, message: err.message };

        if (err.name === 'CastError') error = handleCastError(err);
        if (err.name === 'ValidationError') error = handleValidationError(err);
        if (err.code === 11000) error = handleDuplicateKeyError(err);
        if (err.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
        if (err.name === 'TokenExpiredError') error = handleTokenExpiredError();

        ProdError(error, res);
    }
};