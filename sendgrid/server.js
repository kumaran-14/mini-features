const signale = require('signale')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//initialising express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SendGrid middlewares
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var request = require("request");
// const msg = {
//   to: '',
//   from: 'kumaran1432000@gmail.com',
//   subject: 'lol;llSending with SendGrid is Fun',
// 	html:''
// };
// var options = { method: 'GET',
//   url: 'https://api.sendgrid.com/v3/templates/d-a83df809215a4e8e8098d3d4a07425a1',
//   headers: { authorization: 'Bearer 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' },
//   body: '{}' };

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: '103117050@nitt.edu',
  from: 'kumaran1432000@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

app.get('/' ,(req,res) => {
	res.render('email')
})
app.post('/', (req,res) =>{
  sgMail
  .send(msg)
  .then(() => {
    //Celebrate
    signale.success('emailssent')
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const {message, code, response} = error;

    //Extract response msg
    const {headers, body} = response;
  });

})

app.listen(8000,()=> {
  signale.success('Server Started on port: 8000');
})
