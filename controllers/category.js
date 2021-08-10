const Category = require('../models/category');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
    try{
        const {name} = req.body;
        const category = await new Category({name, slug: slugify(name)}).save();
        res.json(category);
    } catch (err) {
        res.status(400).send("Category Creation Failed")
    }
};

exports.readCategory = async (req, res) => {

};

exports.updateCategory = async (req, res) => {

};

exports.removeCategory = async (req, res) => {

};

exports.listCategories = async (req, res) => {

};