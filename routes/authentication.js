const express = require('express');
const {cUser} = require('../controllers/authentication');

const router = express.Router();

const {authenticationCheck} = require('../middleware/authentication');

router.post("/cUser", authenticationCheck, cUser); //create user

module.exports = router;