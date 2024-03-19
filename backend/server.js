const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const contactRoutes = require('./routes/contactRoutes');

// Import the router from authController.js
const authRouter = require('./controller/authController');



app.use(cors({
  origin: 'http://localhost:3000', // Specify the origin of your React app
  credentials: true // Allow cookies to be sent with the request
}));

//middleware 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));



// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database not connected', err));

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.use('/contact', contactRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
