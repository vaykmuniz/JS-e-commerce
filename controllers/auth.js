const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { jwtSecret, jwtExpire } = require('../config/keys');

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errorMessage: 'Email já existe',
            });
        }
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.json({
            successMessage: 'Sua conta foi cadastrada com sucesso!',
        });
    } catch (err) {
        console.log('signupController error', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

exports.signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorMessage: "Informações inválidas",
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errorMessage: "Informações inválidas",
            });            
        };

        const payload = {
            user: {
                _id: user._id,
            },
        };

        await jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
            if (err) {
                console.log('jwt error: ', err);
            };
            const { _id, username, email, role } = user;

            res.json({
                token,
                user: { _id, username, email, role },
            });
        });

    } catch (err) {
        console.log('inside signin ctrlr err:', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
  
};