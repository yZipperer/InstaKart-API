const Brand = require('../models/brand');
const slugify = require('slugify');

exports.createBrand = async (req, res) => {
    try {
        const {name} = req.body;
        const brand = await new Brand({name, slug: slugify(name)}).save();
        res.json(brand);
    } catch (err) {
        res.status(400).send("Brand Creation Failed");
    }
};

exports.readBrand = async (req, res) => {
    const {slug} = req.params;
    const brand = await Brand.findOne({slug}).exec();
    res.json(brand);
};

exports.updateBrand = async (req, res) => {
    const {name} = req.body;

    try {
        const updatedBrand = await Brand.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true});
        res.json(updatedBrand);
    } catch (err) {
        console.log(err);
        res.status(400).send("Brand Update Failed");
    }
};

exports.removeBrand = async (req, res) => {
    try {
        const {slug} = req.params;
        const deleteBrand = await Brand.findOneAndDelete({slug});
        res.json(deleteBrand);
    } catch (err) {
        res.status(400).send("Brand Deletion Failed");
    }
};

exports.listBrands = async (req, res) => {
    const {filter} = req.body;
    
    if(filter === "created"){
        const brands = await Brand.find({}).sort({createdAt: -1}).exec();
        res.json(brands);
    } else if(filter === "alphabet"){
        const brands = await Brand.find({}).sort({"name": 1}).exec();
        res.json(brands);
    }    
};