const express = require('express');
const {createProduct, listProducts, listSeasonalProducts} = require('../controllers/product');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/product", authenticationCheck, adminCheck, createProduct);
router.get("/products/:amount", listProducts);
router.get("/products/:season", listSeasonalProducts);

module.exports = router;