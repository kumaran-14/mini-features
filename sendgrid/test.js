// var request = require("request");
//
// var options = { method: 'GET',
//   url: 'https://api.sendgrid.com/v3/templates/d-a83df809215a4e8e8098d3d4a07425a1',
//   headers: { authorization: 'Bearer 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' },
//   body: '{}' };
//
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//
//   console.log(JSON.parse(body));
// });

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: '103117050@nitt.edu',
  from: 'kumaran1432000@gmail.com',
  subject: 'whu>>>>>>Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
