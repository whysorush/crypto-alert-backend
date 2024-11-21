const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: recipient,
    subject,
    text,
  });
};

module.exports = sendEmail;
