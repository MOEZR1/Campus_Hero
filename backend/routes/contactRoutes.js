// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const transporter = require('../config/nodemailer');
const Email = require('../models/Email'); // Ensure you have an Email model similar to your Contact model


// Handle POST request to /contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;
    
    // Create a new contact document
    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      message
    });


    // Create a new email document
    const newEmail = new Email({
      from: email, // Assuming 'email' is the email address of the person submitting the form
      to: 'owner@example.com', // Your admin or support email
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Company: ${company}</p><p>Message: ${message}</p>`
    });

    // Save the email document to the database
    await newEmail.save();

    // Save the contact document to the database
    await newContact.save();

    // Send email notification to the owner
    const mailOptions = {
      from: 'your-email@gmail.com', // Sender email address
      to: 'mohammedalbahly205@gmail.com', // Receiver email address
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Company: ${company}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
