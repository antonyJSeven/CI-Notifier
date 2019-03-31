const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NOTIFIER,
    pass: process.env.EMAIL_NOTIFIER_PASS,
  },
});

const mailOptions = {
  from: 'LUNA Deploy Notifier', // sender address
  to: 'antonyjseven@gmail.com', // list of receivers
  // to: 'antonyjseven@gmail.com, leonid_andreiko@epam.com, daria_kozyr@epam.com, kateryna_matvieieva@epam.com, mykhailo_gorychev@epam.com', // list of receivers
  subject: 'New LUNA deployment has been found', // Subject line
  html: 'Default message', // plain text body
};

const parseTextMessage = msg => {
  return msg.split('\n')
    .map(elem => `<h5>${elem}</h5>`)
    .join('\n');
};

const sendMessageViaEmail = (html) => transporter.sendMail(
  {...mailOptions, html: parseTextMessage(html)},
  (err, info) => {
    if (err) console.log(err);
    else console.log(info);
});

export default sendMessageViaEmail
