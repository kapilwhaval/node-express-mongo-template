const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    access_modules: [{
        id: { type: Number, required: true },
        read: { type: Boolean, defult: false },
        write: { type: Boolean, defult: false },
        delete: { type: Boolean, defult: false }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Role", roleSchema);