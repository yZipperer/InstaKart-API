const express = require('express');
const {createCategory, readCategory, updateCategory, removeCategory, listCategories} = require('../controllers/category');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/category", authenticationCheck, adminCheck, createCategory);
router.get("/category/:slug", readCategory);
router.put("/category/:slug", authenticationCheck, adminCheck, updateCategory);
router.delete("/category/:slug", authenticationCheck, adminCheck, removeCategory);
router.post("/categories", listCategories);

module.exports = router;