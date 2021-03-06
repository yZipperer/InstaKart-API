const express = require('express');
const {
    createProduct,
    listProducts,
    listSeasonalProducts,
    deleteProduct,
    individualProduct,
    listAllProducts,
    individualProductUpdate,
    updateProduct,
    productStats,
    productRate
} = require('../controllers/product');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/product", authenticationCheck, adminCheck, createProduct);
router.get("/products/:target/:order", listProducts); //optional ?pageNum=2 query
router.get("/allproducts/:amount", authenticationCheck, adminCheck, listAllProducts);
router.get("/products/:season/:amount", listSeasonalProducts);
router.delete("/product/:slug", authenticationCheck, adminCheck, deleteProduct);
router.get("/product/:slug", individualProduct);
router.get("/productupdate/:slug", authenticationCheck, adminCheck, individualProductUpdate);
router.put("/product/:slug", authenticationCheck, adminCheck, updateProduct);

router.put("/product/rate/:pID", authenticationCheck, productRate)
//stat routes
router.get("/products/stats", authenticationCheck, adminCheck, productStats);

module.exports = router;