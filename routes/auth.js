const express = require('express');
const router = express.Router();

const { signupValidator, validatorResult } = require('../middleware/validator');


addHeader = function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('X-XSS-Protection', '0');
    next();
};

router.post('/signup', addHeader, signupValidator, validatorResult );

/*
router.post('/signup', (req, res)=>{
    console.log('aaaaaa');
});
*/

module.exports = router;