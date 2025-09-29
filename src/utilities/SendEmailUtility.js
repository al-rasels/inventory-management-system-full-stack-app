/* -------------------------------------------------------------------------- */
/*                                Nodemailer Setup                            */
/* -------------------------------------------------------------------------- */

const nodemailer = require("nodemailer");
const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address
    port: 587, // SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
      user: "info@teamrabbil.com", //  email user
      pass: "Rabbil@12345", //  password
    },
    tls: { rejectUnauthorized: false },
  });

  // 2. Define the email options
  const mailOptions = {
    to: EmailTo, // list of receivers
    from: "Inventory Management System <rm.shanto786@gmail.com>", // sender address
    subject: EmailSubject, // Subject line
    text: EmailText, // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  // 3. Send the email
  return await transporter.sendMail(mailOptions);
};
// Exporting Module
module.exports = SendEmailUtility;
