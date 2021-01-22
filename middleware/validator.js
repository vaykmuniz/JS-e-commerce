const { check, validationResult } = require('express-validator');

exports.signupValidator = [
    check('username')
        .not().isEmpty()
        .trim()
        .withMessage('São necessários todos os campos'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email invalio'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password deve ter no mínimo 6 chracteres')    
];

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    
    if (hasErrors) {
        const firstError = result.array()[0].msg;
        
        return res.status(400).json({
            errorMessage: firstError
        });
    
    };

    next();
};

exports.signinValidator = [
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email invalio'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password deve ter no mínimo 6 chracteres')    
];
