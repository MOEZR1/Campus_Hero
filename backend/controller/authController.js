// controller/ authcontroller.js
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');




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
        if (!match) {
            return res.json({ error: 'Password do not match' });
        }

        // Sign the token with isAdmin property
        jwt.sign(
            {
              id: user._id, // The ID of the user
              isAdmin: user.isAdmin // The admin status of the user
            }, 
            process.env.JWT_SECRET,
            {
              expiresIn: '1d' // The expiration time of the token
            },
            (err, token) => {
              if (err) {
                // Handle error
                return res.status(500).json({ error: 'Error signing token' });
              }
              // Set the token in a cookie or send it in the response
              res.cookie('token', token, { httpOnly: true });
              // Send the response with the token and user information
              res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
              });
            }
          );
          
        
    } catch (error) {
        console.error('Login error:', error);
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

// Profile Update Endpoint
const updateProfile = async (req, res) => {
    try {
      const { id } = req.user; // Changed from userId to id
      const { username, email } = req.body;

      if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required.' });
      }

      const user = await User.findByIdAndUpdate(id, { username, email }, { new: true, runValidators: true });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const userWithoutPassword = { ...user._doc, password: undefined };
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};



  



module.exports = {
    
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};
