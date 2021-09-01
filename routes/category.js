const express = require('express');
const {createCategory, readCategory, updateCategory, removeCategory, listCategories, listSubCategories} = require('../controllers/category');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/category", authenticationCheck, adminCheck, createCategory);
router.get("/category/:slug", readCategory);
router.put("/category/:slug", authenticationCheck, adminCheck, updateCategory);
router.delete("/category/:slug", authenticationCheck, adminCheck, removeCategory);
router.post("/categories", listCategories);
router.get("/category/subCategories/:_id", listSubCategories);

module.exports = router;