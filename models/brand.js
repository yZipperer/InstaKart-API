const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: [64, "Brand Name is Too Long"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }

}, {timestamps: true});

module.exports = mongoose.model("Brand", brandSchema);