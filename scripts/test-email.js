const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function testEmail() {
    console.log("Testing Email configuration...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not Set");
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set" : "Not Set");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("Missing credentials.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email from Blog App",
            text: "If you receive this, email configuration is working!",
        });
        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
    } catch (error) {
        console.error("Error sending test email:", error);
    }
}

testEmail();
