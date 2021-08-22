const SubsididaryBrand = require('../models/subsidiaryBrand');
const slugify = require('slugify');

exports.createSubsididaryBrand = async (req, res) => {
    try {
        const {name, parent} = req.body;
        const subsididaryBrand = await new SubsididaryBrand({name, parent, slug: slugify(name)}).save();
        res.json(subsididaryBrand);
    } catch (err) {
        res.status(400).send("Subsididary Brand Creation Failed");
    }
};

exports.readSubsididaryBrand = async (req, res) => {
    const {slug} = req.params;
    const subsididaryBrand = await SubsididaryBrand.findOne({slug}).exec();
    res.json(subsididaryBrand);
};

exports.updateSubsididaryBrand = async (req, res) => {
    const {name, parent} = req.body;

    try {
        const updatedSubsididaryBrand = await SubsididaryBrand.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true});
        res.json(updatedSubsididaryBrand);
    } catch (err) {
        console.log(err);
        res.status(400).send("Subsididary Brand Update Failed");
    }
};

exports.removeSubsididaryBrand = async (req, res) => {
    try {
        const {slug} = req.params;
        const deleteSubsididaryBrand = await SubsididaryBrand.findOneAndDelete({slug});
        res.json(deleteSubsididaryBrand);
    } catch (err) {
        res.status(400).send("Subsididary Brand Deletion Failed");
    }
};

exports.listSubsididaryBrand = async (req, res) => {
    const {filter} = req.body;
    
    if(filter === "created"){
        const subsididaryBrands = await SubsididaryBrand.find({}).sort({createdAt: -1}).exec();
        res.json(subsididaryBrands);
    } else if(filter === "alphabet"){
        const subsididaryBrands = await SubsididaryBrand.find({}).sort({"name": 1}).exec();
        res.json(subsididaryBrands);
    } 
};