var nodemailer = require('nodemailer');

var emailHandler = function (req, res) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'swamy5272@gmail.com',
            pass: 'XXXXX'
        }
    });

    var mailOptions = {
        from: 'swamy5272@gmail.com',
        to: 'bkambagiri@prokarma.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).send();
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent!');
        }
    });
}

module.exports = emailHandler;
