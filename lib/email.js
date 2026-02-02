import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    // Use environment variables for configuration
    service: 'gmail', // or configured host/port
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
