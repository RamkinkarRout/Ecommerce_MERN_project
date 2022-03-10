const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
