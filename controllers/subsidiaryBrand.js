const SubsidiaryBrand = require('../models/subsidiaryBrand');
const slugify = require('slugify');

exports.createSubsidiaryBrand = async (req, res) => {
    try {
        const {name, parent} = req.body;
        const subsidiaryBrand = await new SubsidiaryBrand({name, parent, slug: slugify(name)}).save();
        res.json(subsidiaryBrand);
    } catch (err) {
        res.status(400).send("Subsidiary Brand Creation Failed");
    }
};

exports.readSubsidiaryBrand = async (req, res) => {
    const {slug} = req.params;
    const subsidiaryBrand = await SubsidiaryBrand.findOne({slug}).exec();
    res.json(subsidiaryBrand);
};

exports.updateSubsidiaryBrand = async (req, res) => {
    const {name, parent} = req.body;

    try {
        const updatedSubsidiaryBrand = await SubsidiaryBrand.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true});
        res.json(updatedSubsidiaryBrand);
    } catch (err) {
        console.log(err);
        res.status(400).send("Subsidiary Brand Update Failed");
    }
};

exports.removeSubsidiaryBrand = async (req, res) => {
    try {
        const {slug} = req.params;
        const deleteSubsidiaryBrand = await SubsidiaryBrand.findOneAndDelete({slug});
        res.json(deleteSubsidiaryBrand);
    } catch (err) {
        res.status(400).send("Subsidiary Brand Deletion Failed");
    }
};

exports.listSubsidiaryBrands = async (req, res) => {
    const {filter} = req.body;
    
    if(filter === "created"){
        const subsidiaryBrands = await SubsidiaryBrand.find({}).sort({createdAt: -1}).exec();
        res.json(subsidiaryBrands);
    } else if(filter === "alphabet"){
        const subsidiaryBrands = await SubsidiaryBrand.find({}).sort({"name": 1}).exec();
        res.json(subsidiaryBrands);
    } 
};