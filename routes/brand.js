const express = require('express');
const {createBrand, readBrand, updateBrand, removeBrand, listBrands} = require('../controllers/brand');
const {listSubsidiaryBrands} = require('../controllers/brand');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/brand", authenticationCheck, adminCheck, createBrand);
router.get("/brand/:slug", readBrand);
router.put("/brand/:slug", authenticationCheck, adminCheck, updateBrand);
router.delete("/brand/:slug", authenticationCheck, adminCheck, removeBrand);
router.post("/brands", listBrands);
router.get("/brand/subsidiarybrand/:_id", listSubsidiaryBrands);

module.exports = router;