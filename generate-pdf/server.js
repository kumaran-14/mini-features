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
const pug = require('pug');
var pdf = require('html-pdf');
var options = {
  format: 'Letter',
  base: 'file://' + path.resolve('./public') + '/' };
var html;


// Compile the source code
const compiledFunction = pug.compileFile('./public/template/pdftemplate.pug');

// Render a set of data
html = compiledFunction({
  student: {
  	'uniqueID' : 'Uusdaosdasoda',
  	'personalDetails' : {
  		'rollno':'103117050',
  		'firstname':'Kumaran'
  	}
  }
});

pdf.create(html, options).toFile('./public/files/generated-pdfs/103117050.pdf', function(err, resp) {
  if (err) return console.log(err);
  console.log(resp); // { filename: '/app/newfile.pdf' }
  console.log('file://' + path.resolve('./public') + '/')
  res.render('pdf')

});

})

app.get('/pdf' ,(req,res) => {
	res.render('pdf')
})

;;
app.listen(8000,()=> {
  signale.success('Server Started on port: 3000');
})
