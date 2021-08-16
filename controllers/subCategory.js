const SubCategory = require('../models/subCategory');
const slugify = require('slugify');

exports.createSubCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const subCategory = await new SubCategory({name, slug: slugify(name)}).save();
        res.json(subCategory);
    } catch (err) {
        res.status(400).send("Subcategory Creation Failed");
    }
};

exports.readSubCategory = async (req, res) => {
    const {slug} = req.params;
    const subCategory = await SubCategory.findOne({slug}).exec();
    res.json(subCategory);
};

exports.updateSubCategory = async (req, res) => {
    const {name} = req.body;

    try {
        const updatedSubCategory = await SubCategory.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true});
        res.json(updatedSubCategory);
    } catch (err) {
        console.log(err);
        res.status(400).send("Subcategory Update Failed");
    }
};

exports.removeSubCategory = async (req, res) => {
    try {
        const {slug} = req.params;
        const deleteSubCategory = await SubCategory.findOneAndDelete({slug});
        res.json(deleteSubCategory);
    } catch (err) {
        res.status(400).send("Subcategory Deletion Failed");
    }
};

exports.listSubCategories = async (req, res) => {
    const subCategories = await SubCategory.find({}).sort({createdAt: -1}).exec();
    res.json(subCategories);
};