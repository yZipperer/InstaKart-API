const express = require('express');
const {createSubCategory, readSubCategory, updateSubCategory, removeSubCategory, listSubCategories} = require('../controllers/subCategory');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/subCategory", authenticationCheck, adminCheck, createSubCategory);
router.get("/SubCategory/:slug", readSubCategory);
router.put("/SubCategory/:slug", authenticationCheck, adminCheck, updateSubCategory);
router.delete("/SubCategory/:slug", authenticationCheck, adminCheck, removeSubCategory);
router.get("/SubCategories", listSubCategories);

module.exports = router;