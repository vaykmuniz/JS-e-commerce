const express = require('express');
const router = express.Router();

const { signupValidator, signinValidator, validatorResult } = require('../middleware/validator');
const { signupController, signinController } = require('../controllers/auth');


addHeader = function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('X-XSS-Protection', '0');
    next();
};

router.post('/signup', addHeader, signupValidator, validatorResult, signupController );

router.post('/signin', addHeader, signinValidator, validatorResult, signinController );

module.exports = router;