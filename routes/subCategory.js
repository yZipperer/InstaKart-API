const express = require('express');
const {createSubCategory, readSubCategory, updateSubCategory, removeSubCategory, listSubCategories} = require('../controllers/subCategory');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/subCategory", authenticationCheck, adminCheck, createSubCategory);
router.get("/subCategory/:slug", readSubCategory);
router.put("/subCategory/:slug", authenticationCheck, adminCheck, updateSubCategory);
router.delete("/subCategory/:slug", authenticationCheck, adminCheck, removeSubCategory);
router.post("/subCategories", listSubCategories);

module.exports = router;