const nodemailer = require('nodemailer');
const config = require('./config');

const transporter =  nodemailer.createTransport(config.transport)

const sendEmail = async (data, newTransportOption) => {
    let transport = transporter

    if(typeof newTransportOption === 'object') {
        transport = newTransportOption
    }

    transport.sendMail({
        from: data.from || '',
        to: data.to || '',
        subject: data.subject || '',
        text: data.text || '',
        html: data.html || '',
        attachments: [{'filename': '', 'content': ''}]
    }, function(err, msg) {
        if(err) {
            console.log(err);
        }
    })
};

module.exports = sendEmail;