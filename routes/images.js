const express = require('express');
const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

const {upload, remove} = require("../controllers/images");

router.post("/upload", authenticationCheck, adminCheck, upload);
router.post("/remove", authenticationCheck, adminCheck, remove);

module.exports = router;