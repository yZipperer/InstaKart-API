const express = require('express');
const {cUser, currentUser} = require('../controllers/authentication');

const router = express.Router();

const {authenticationCheck} = require('../middleware/authentication');

router.post("/cUser", authenticationCheck, cUser); //create user
router.post("/currentUser", authenticationCheck, currentUser); 

module.exports = router;