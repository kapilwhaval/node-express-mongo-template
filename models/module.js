const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Module", moduleSchema)