const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { default: validator } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'All Users must have a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'All Users must have an email address'],
        unique: [true, 'User with this email already exists'],
        validate: [validator.default.isEmail, 'Please provide a valid email'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'All Users must have a password'],
        select: false,
        minlength: 6
    },
    passwordConfirm: {
        type: String,
        required: [true, 'All Users must confirm their passwords'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords do not match'
        }
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: {
            values: ['customer', 'admin'],
            message: 'role can only be admin or customer'
        },
        default: 'customer'
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpireTime: {
        type: Date,
        select: false
    },
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1500;
    next();
})

userSchema.methods.checkPassword = async function (enteredPass, actualPass) {
    return bcrypt.compare(enteredPass, actualPass).then(result => result)
}


userSchema.methods.changedPassword = async function (iat) {
    if (this.passwordChangedAt) {
        const passwordChangedTime = (this.passwordChangedAt.getTime() / 1000);
        return passwordChangedTime > iat;
    }
    return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;