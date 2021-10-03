const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 48,
        text: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
        text: true
    },
    pricePerUnit: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
        text: true
    },
    active: {
        type: Boolean,
        default: true
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    subCategories: [
        {
            type: ObjectId,
            ref: "SubCategory"
        }
    ],
    quantity: {
        type: Number,
    },
    suggestedQuantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    mainImage: {
        type: Array
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["Yes", "No"]
    },
    brand: {
        type: ObjectId,
        ref: "Brand"
    },
    subsidiaryBrands: [
        {
            type: ObjectId,
            ref: "SubsidiaryBrand"
        }
    ],
    taxable: {
        type: Boolean,
        default: false
    },
    dimensionLength: {
        type: Number,
        req: true
    },
    dimensionWidth: {
        type: Number,
        req: true
    },
    dimensionHeight: {
        type: Number,
        req: true
    },
    weight: {
        type: String,
        req: true
    },
    shelfLife: {
        type: Number,
        req: true
    },
    ratings: [
        {
            stars: Number,
            author: {
                type: ObjectId,
                ref: "User"
            }
        }
    ],
    origin: {
        type: String,
        trim: true,
        text: true
    },
    seasonal: {
        type: String,
        enum: ["Winter", "Fall", "Spring", "Summer", "All"],
        default: "All"
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);