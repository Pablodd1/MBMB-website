import nodemailer from 'nodemailer';

export async function sendEmailNotification( subject, html) {
    const {EMAIL_HOST,EMAIL_PORT,EMAIL_TITLE,EMAIL_PASS,ADMIN} = process.env;
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
            user: EMAIL_TITLE,
            pass: EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: EMAIL_TITLE,
        to:ADMIN,
        subject: subject,
        html:html,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email');
        throw error;
    }
}
