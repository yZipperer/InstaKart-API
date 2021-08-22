const express = require('express');
const {createSubsidiaryBrand, readSubsidiaryBrand, updateSubsidiaryBrand, removeSubsidiaryBrand, listSubsidiaryBrands} = require('../controllers/subsidiaryBrand');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/subsidiaryBrand", authenticationCheck, adminCheck, createSubsidiaryBrand);
router.get("/subsidiaryBrand/:slug", readSubsidiaryBrand);
router.put("/subsidiaryBrand/:slug", authenticationCheck, adminCheck, updateSubsidiaryBrand);
router.delete("/subsidiaryBrand/:slug", authenticationCheck, adminCheck, removeSubsidiaryBrand);
router.post("/subsidiaryBrands", listSubsidiaryBrands);

module.exports = router;