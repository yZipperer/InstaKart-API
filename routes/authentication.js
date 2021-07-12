const express = require('express');
const {cUser} = require('../controllers/authentication');

const router = express.Router();

router.get("/auth", cUser);

module.exports = router;