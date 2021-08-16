const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: [32, "Category Name is Too Long"]
    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },

}, {timestamps: true});

module.exports = mongoose.model("SubCategory", subCategorySchema);