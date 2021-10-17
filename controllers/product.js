const Product = require("../models/product");
const slugify = require("slugify");
const cloudinary = require("cloudinary");

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
        const {target, order} = req.params;
        const currentPage = req.query.pageNum || 1;
        const productsPerPage = req.query.resPerPage || 4;

        if(target, order) {
            let products = await Product.find({"seasonal": "All", "active": true})
            .skip((currentPage - 1) * parseInt(productsPerPage))
            .limit(parseInt(productsPerPage))
            .populate("category")
            .populate("subCategories")
            .populate("brand")
            .populate("subsidiaryBrands")
            .sort([[target, order]])
            .exec()

            res.json(products);
        } else {
            let products = await Product.find({"seasonal": "All", "active": true})
            .skip((currentPage - 1) * parseInt(productsPerPage))
            .limit(parseInt(productsPerPage))
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
        let product = await Product.findOne({slug: req.params.slug}).exec();

        for(let i = 0; i < product.images.length; i++){
            await cloudinary.uploader.destroy(product.images[i].public_id, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        await cloudinary.uploader.destroy(product.mainImage[0].public_id, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        
        const deletedProduct = await Product.findOneAndRemove({slug: req.params.slug})
        .exec();
        res.json(deletedProduct);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Product Deletion Failed");
    }
};

//for users
//will cut out certain information
exports.individualProduct = async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug, "active": true})
        .populate("category")
        .populate("subCategories")
        .populate("brand")
        .populate("subsidiaryBrands")
        .select("-pricePerUnit -suggestedQuantity -sold")
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

exports.productStats = async (req, res) => {
    let totalNumber = await Product.find({}).estimatedDocumentCount().exec();
    res.json(totalNumber);
};

//ratings
exports.productRate = async (req, res) => {
    const {stars, text} = req.body;
    const product = await Product.findById(req.params.pID).exec();
    const user = await User.findOne({email: req.user.email}).exec();
    
    //duplicate rating check
    let exists = product.ratings.find((e) => {
        e.author.toString() === user._id.toString();
    });

    if(exists === undefined) {
        const newRating = await Product.findByIdAndUpdate(product._id, {
            $push: {ratings: {
                stars: stars,
                text: text,
                author: user._id
            }}
        }, {new: true}).exec();
        res.json(rating);
    } else {
        const updatedRating = Product.updateOne({
                ratings: {$elemMatch: exists},
        }, 
            {$set: {"ratings.$.stars": stars, "ratings.$.text": text}},
            {new: trues}
        ).exec();
        res.json(updatedRating);
    }
};