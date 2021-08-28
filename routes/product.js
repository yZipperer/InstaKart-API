const express = require('express');
const {createProduct, listProducts} = require('../controllers/product');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/product", authenticationCheck, adminCheck, createProduct);
router.get("/products", listProducts)

module.exports = router;