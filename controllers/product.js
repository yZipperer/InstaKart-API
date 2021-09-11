const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async(req, res) => {
    try{
        req.body.slug = slugify(req.body.name);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch(err){
        console.log(err);
        res.status(400).json({
            err: err.message
        });
    }
};

exports.listProducts = async (req, res) => {
    let products = await Product.find({})
    .limit(parseInt(req.params.amount))
    .populate("category")
    .populate("subCategories")
    .populate("brand")
    .populate("subsidiaryBrands")
    .sort([["createdAt", "desc"]])
    .exec()
    res.json(products);
};

exports.listSeasonalProducts = async (req, res) => {
    let seasonalProducts = await Product.find({})
    .limit(req.params.season.toString())
    .populate("category")
    .populate("subCategories")
    .populate("brand")
    .populate("subsidiaryBrands")
    .sort([["createdAt", "desc"]])
    .exec()
    res.json(seasonalProducts);
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndRemove({slug: req.params.slug})
        .exec();
        res.json(deletedProduct);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Product Deletion Failed");
    }
};

exports.individualProduct = async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug})
        .populate("category")
        .populate("subCategories")
        .populate("brand")
        .populate("subsidiaryBrands")
        .exec();
    res.json(product);
}