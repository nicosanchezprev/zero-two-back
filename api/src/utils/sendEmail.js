var nodemailer = require('nodemailer');

var mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: 'user1@example.com, user2@example.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer 😉 ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};

const sendEmail = async(email, subject, text) => {
    try {
    const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: "juandavidgr10002@gmail.com",
                pass: "ddlpwwmdewbgpqhd"
            }
    })
    await transporter.sendMail({
        from: 'from@example.com',
        to: email,
        subject: subject,
        text: text,
      });
      
    }catch (err) {
        throw new Error("email not sent");
    }
}

module.exports = sendEmail;