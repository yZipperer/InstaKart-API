const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: [32, "Category Name is Too Long"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }

}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);