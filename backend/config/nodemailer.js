// config/nodemailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedalbahly205@gmail.com', // Your Gmail email address
    pass: 'rtwj iank gqtc jmrs' // Your Gmail password or app-specific password
  }
});

module.exports = transporter;
