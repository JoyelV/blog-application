require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS?.replace(/\s+/g, ''); // Remove spaces if any

console.log(`User: ${user}`);
console.log(`Pass length: ${pass?.length}`);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    },
});

const sendEmail = async (to, subject, html) => {
    try {
        console.log(`Sending email to ${to}...`);
        const mailOptions = {
            from: user,
            to: to,
            subject: subject,
            html: html,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
    } catch (error) {
        console.error("Error sending email:", JSON.stringify(error, null, 2));
    }
};

sendEmail(user, 'Test Subject', '<h1>Test Body</h1>');
