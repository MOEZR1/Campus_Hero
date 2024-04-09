const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const contactRoutes = require('./routes/contactRoutes');
const deadlineRoutes = require('./routes/deadlineRoutes'); 
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Import the admin routes
const emailRoutes = require('./routes/emailRoutes');
const habitRoutes = require('./routes/habitRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const path = require('path');



const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database not connected', err));

app.use('/', userRoutes);
app.use('/contact', contactRoutes);
app.use('/deadlines', deadlineRoutes); // Updated route path
app.use('/admin', adminRoutes); // Use admin routes
app.use('/emails', emailRoutes);
app.use('/habit', habitRoutes);
app.use('/api', passwordResetRoutes); 



// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
