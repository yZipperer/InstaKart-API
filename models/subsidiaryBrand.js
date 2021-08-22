const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const subsidiaryBrandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: [64, "Sub Name is Too Long"]
    },
    parent: {
        type: ObjectId,
        ref: "Brand",
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },

}, {timestamps: true});

module.exports = mongoose.model("SubsidiaryBrand", subsidiaryBrandSchema);