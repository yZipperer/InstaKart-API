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

/* -listProducts- lists all products
    parameters:
        amount: number

    Also filters out any seasonal products and non-active products
*/

exports.listProducts = async (req, res) => {
    //target = createdAt || updatedAt
    //order = desc || asc
    try {
        const {target, order, amount} = req.params;

        if(target, order, amount) {
            let products = await Product.find({"seasonal": "All", "active": true})
            .limit(parseInt(req.params.amount))
            .populate("category")
            .populate("subCategories")
            .populate("brand")
            .populate("subsidiaryBrands")
            .sort([[req.params.target, req.params.order]])
            .exec()

            res.json(products);
        } else {
            let products = await Product.find({"seasonal": "All", "active": true})
            .limit(parseInt(req.params.amount))
            .populate("category")
            .populate("subCategories")
            .populate("brand")
            .populate("subsidiaryBrands")
            .exec()

            res.json(products);
        }
    } catch (err) {
        console.log(err);
    }
};

/* -listSeasonalProducts- lists products based on season
    parmaters:
        amount: number
        season: "All", "Winter", "Spring", "Summer", "Fall"

    also filters out any non-active products
*/

exports.listSeasonalProducts = async (req, res) => {
    let seasonalProducts = await Product.find({"seasonal": req.params.season.toString(), "active": true})
    .limit(parseInt(req.params.amount))
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
};

exports.individualProductUpdate = async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug})
        .populate("category")
        .populate("brand")
        .exec();
    res.json(product);
};

//admin ONLY
exports.listAllProducts = async (req, res) => {
    let products = await Product.find()
    .limit(parseInt(req.params.amount))
    .populate("category")
    .populate("subCategories")
    .populate("brand")
    .populate("subsidiaryBrands")
    .sort([["createdAt", "desc"]])
    .exec()
    res.json(products);
};

exports.updateProduct = async (req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const updatedProduct = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec();
        res.json(updatedProduct);
    } catch (err) {
        console.log("err");
        res.status(400).json({
            err: err.message
        });
    }
};