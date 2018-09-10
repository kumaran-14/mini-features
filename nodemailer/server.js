const signale = require('signale')
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const nodemailer = require('nodemailer');

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

app.get('/' ,(req,res) => {
	res.render('email')
})
app.post('/', (req,res) =>{
  const transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
      user: 'spamatkumaran@yahoo.com',
      pass: 'spamspamspam'
    }
  })
  const mailOptions = {
    from: `spamatkumaran@yahoo.com`,
    to: `${req.body.email}`,
    subject: `Nope hola scholarship asmessage`,
    text: `sportsfete18`
  }
  transporter.sendMail(mailOptions, function(err, resp) {
    if (err) {
      console.error('there was an error: ', err);
      return res.send('errorososososo')

    } else {
      console.log('here is the res: ', resp)
      return res.send('all ok')
    }
  })
})
;;
app.listen(8000,()=> {
  signale.success('Server Started on port: 8000');
})
