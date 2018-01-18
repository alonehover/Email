const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        pass: ''
    }
})

const sendEmail = (data) => {
    transporter.sendMail({
        from: '',
        to: '',
        subject: '',
        text: '',
        html: '',
        attachments: [{'filename': '', 'content': ''}]
    })
};

module.exports = sendEmail;