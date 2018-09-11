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
var request = require("request");
const msg = {
  to: '',
  from: 'kumaran1432000@gmail.com',
  subject: 'lol;llSending with SendGrid is Fun',
	html:''
};
var options = { method: 'GET',
  url: 'https://api.sendgrid.com/v3/templates/d-a83df809215a4e8e8098d3d4a07425a1',
  headers: { authorization: 'Bearer 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' },
  body: '{}' };

app.get('/' ,(req,res) => {
	res.render('email')
})
app.post('/', (req,res) =>{
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
		msg.html = `${body.versions[0].html_content}`
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
	});
})

app.listen(8000,()=> {
  signale.success('Server Started on port: 8000');
})
