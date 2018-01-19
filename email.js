const nodemailer = require('nodemailer');
const config = require('./config');

const transporter =  nodemailer.createTransport(config.transport)

const sendEmail = (data, newTransportOption) => {
    let transport = transporter;

    if(typeof newTransportOption === 'object') {
        transport = newTransportOption;
    }

    return transport.sendMail({
        from: data.from || '',
        to: data.to || '',
        subject: data.subject || '',
        text: data.text || '',
        html: data.html || '',
        attachments: data.attachments || ''
    });
};

module.exports = sendEmail;