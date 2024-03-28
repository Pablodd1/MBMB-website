import nodemailer from 'nodemailer';

export async function sendEmailNotification(receipts, subject, html) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_TITLE,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_TITLE,
        to: receipts,
        subject: subject,
        html: `
        <h2>New Consultation Form Submission</h2>
        <p><strong>Name:</strong> ${html.name}</p>
        <p><strong>Email:</strong> ${html.email}</p>
        <p><strong>Practice Name:</strong> ${html.practiceName}</p>
        <p><strong>Message:</strong> ${html.message}</p>
      `,
    };
    await transporter.sendMail(mailOptions);
}