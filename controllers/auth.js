const User = require('../models/User');
const bcrypt = require('bcryptjs');


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