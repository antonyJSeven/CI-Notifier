const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NOTIFIER,
    pass: process.env.EMAIL_NOTIFIER_PASS,
  },
});

const mailOptions = {
  from: 'huaaray', // sender address
  to: 'antonyjseven@gmail.com', // list of receivers
  subject: 'Subject of your email. custom', // Subject line
  html: '<p>message will be here</p>', // plain text body
};

export const sendMail = () => transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.log(err);
  else console.log(info);
});
