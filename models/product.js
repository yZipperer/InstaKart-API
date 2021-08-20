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
        sold: {
            type: Number,
            default: 0
        }
    },
    suggestedQuantity: {
        type: Number,
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["Yes", "Local Pickup"]
    },
    brand: {
        type: String,
        enum: ["General Mills","Nestle","Ritz"]
    },
    taxable: {
        type: Boolean,
        default: false
    },
    dimensions: {
        type: String,
        req: true
    },
    weight: {
        type: String,
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