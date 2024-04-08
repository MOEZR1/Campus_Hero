const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your Gmail email address from .env
    pass: process.env.EMAIL_PASSWORD // Your Gmail App Password from .env
  }
});

const sendEmail = async ({ email, subject, message }) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
