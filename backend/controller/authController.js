// controller/ authcontroller.js
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// Register Endpoint 
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if username is entered 
        if (!username) {
            return res.json({ error: 'Username is required' });
        }

        // Check if password is valid 
        if (!password || password.length < 6) {
            return res.json({ error: 'Password is required and should be at least 6 characters long' });
        }
        // Check email existence
        const exist = await User.findOne({ email }); 
        if (exist) {
            return res.json({ error: 'Email is already taken' });
        }

        // Check if username is taken
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.json({ error: 'Username is already taken' });
        }

        const hashedPassword = await hashPassword(password);
        // Create User in database 
        const user = await User.create({ username, email, password: hashedPassword });

        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login Endpoint 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // Check if passwords match 
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.json({ error: 'Password do not match' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Profile Endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ error: 'Invalid token' });
            } else {
                User.findById(decodedToken.id)
                    .then(user => {
                        if (user) {
                            res.json(user);
                        } else {
                            res.status(404).json({ error: 'User not found' });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: 'Internal server error' });
                    });
            }
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
};
