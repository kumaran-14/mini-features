const signale = require('signale')
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const upload = require('./routes/upload.js')


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

app.get('/',(req,res) => {
  res.render('upload')
})
app.post('/',(req,res) => {
  upload(req, res, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(req.file)
    return res.send('uploaded')
  })
})


app.listen(8000,()=> {
  signale.success('Server Started on port: 3000');
})
