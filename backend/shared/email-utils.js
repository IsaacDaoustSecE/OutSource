const nodemailer = require("nodemailer");

const EMAIL = process.env.GOOGLE_EMAIL;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
    },
});

async function sendEmail(to, subject, message) {
    if (!to || !subject || !message) {
        console.error(
            `Unable to send email: to, subject, and message must be provided:
          to: ${to}
          subject: ${subject}
          message: ${message}`
        );
        return;
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: EMAIL,
                // to,
                to: "isaacd20015@gmail.com",
                subject: subject,
                text: message,
            },
            (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            }
        );
    });
}

module.exports = sendEmail;
