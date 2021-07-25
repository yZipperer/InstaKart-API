const express = require('express');
const {cUser, currentUser} = require('../controllers/authentication');

const router = express.Router();

const {authenticationCheck, adminCheck} = require('../middleware/authentication');

router.post("/cUser", authenticationCheck, cUser); //create user
router.post("/currentUser", authenticationCheck, currentUser); //gets current user
router.post("/currentAdmin", authenticationCheck, adminCheck, currentUser); 

module.exports = router;