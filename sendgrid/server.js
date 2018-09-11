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
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: '',
  from: 'kumaran1432000@gmail.com',
  subject: 'lol;llSending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
app.get('/' ,(req,res) => {
	res.render('email')
})
app.post('/', (req,res) =>{
	msg.to = `${req.body.email}`;
	sgMail
  .send(msg)
  .then(() => {
     return res.send('ALL OK')
  })
  .catch(error => {
    //Log friendly error
    console.error(error.toString());
    //Extract error msg
    const {message, code, response} = error;
    //Extract response msg
    const {headers, body} = response;
		return res.send('not ok')
  });

})

app.listen(8000,()=> {
  signale.success('Server Started on port: 8000');
})
