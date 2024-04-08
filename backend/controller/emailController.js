// backend/controllers/emailController.js
const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const Email = require('../models/Email');

const imapConfig = {
  user: 'your_inbox_email@example.com',
  password: 'your_inbox_password',
  host: 'imap.example.com',
  port: 993,
  tls: true,
};

function fetchAndStoreEmails() {
  const imap = new Imap(imapConfig);

  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) throw err;

      imap.search(['UNSEEN'], (err, results) => {
        if (err) throw err;

        results.forEach((result) => {
          const f = imap.fetch(result, { bodies: '' });
          f.on('message', (msg, seqno) => {
            msg.on('body', (stream, info) => {
              simpleParser(stream, async (err, mail) => {
                try {
                  const newEmail = new Email({
                    sender: mail.from.value[0].address,
                    recipient: imapConfig.user, // Admin
                    subject: mail.subject,
                    body: mail.text,
                  });
                  await newEmail.save();

                  // Mark email as read in inbox
                  imap.addFlags(seqno, 'SEEN', (err) => {
                    if (err) console.error('Error marking as read:', err);
                  }); 
                } catch (err) {
                  console.error('Error saving email:', err);
                }
              });
            });
          });
        });
      });
    });
  });

  imap.once('error', (err) => {
    console.error('IMAP connection error:', err);
  });

  imap.once('end', () => {
    console.log('IMAP connection ended');
  });

  imap.connect();
}

// Call this function periodically, e.g., using a cron job or setInterval
fetchAndStoreEmails();
