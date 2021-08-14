const Category = require('../models/category');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category);
    } catch (err) {
        res.status(400).send("Category Creation Failed");
    }
};

exports.readCategory = async (req, res) => {
    const {slug} = req.params;
    const category = await Category.findOne({slug}).exec();
    res.json(category);
};

exports.updateCategory = async (req, res) => {
    const {name} = req.body;

    try {
        const updatedCategory = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true});
        res.json(updatedCategory);
    } catch (err) {
        console.log(err);
        res.status(400).send("Category Update Failed");
    }
};

exports.removeCategory = async (req, res) => {
    try {
        const {slug} = req.params;
        const deleteCategory = await Category.findOneAndDelete({slug});
        res.json(deleteCategory);
    } catch (err) {
        res.status(400).send("Category Deletion Failed");
    }
};

exports.listCategories = async (req, res) => {
    const categories = await Category.find({}).sort({createdAt: -1}).exec();
    res.json(categories);
};