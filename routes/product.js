const express = require('express');
const {
    createProduct,
    listProducts,
    listSeasonalProducts,
    deleteProduct,
    individualProduct,
    listAllProducts
} = require('../controllers/product');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/product", authenticationCheck, adminCheck, createProduct);
router.get("/products/:amount", listProducts);
router.get("/allproducts/:amount", authenticationCheck, adminCheck, listAllProducts);
router.get("/products/:season/:amount", listSeasonalProducts);
router.delete("/product/:slug", authenticationCheck, adminCheck, deleteProduct);
router.get("/product/:slug", individualProduct);

module.exports = router;