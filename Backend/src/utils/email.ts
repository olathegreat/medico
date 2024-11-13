const nodemailer = require("nodemailer");   





type Options = {
    email: string;
    message: string;
    subject: string;
}
const sendEmail = async (options: Options) =>{
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })  

    const mailOptions = {
        from: 'Olarotimi <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };  

    await transporter.sendMail(mailOptions);    
}

module.exports = sendEmail;