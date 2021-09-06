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
    .popoulate("category")
    .populate("subCategories")
    .popoulate("brand")
    .populate("subsidiaryBrands")
    .sort([["createdAt", "desc"]])
    .exec()
    res.json(products);
};