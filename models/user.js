const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4 } = require('uuid');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    last_name: {
        type: String,
        require: true,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 13
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user"
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
}, { timestamps: true })

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = v4();
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);