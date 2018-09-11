const pug = require('pug');
const pdf = require('html-pdf');
const options = { format: 'Letter' };
var html;


// Compile the source code
const compiledFunction = pug.compileFile('./public/pdftemplate.pug');

// Render a set of data
html = compiledFunction({
  name: 'Timothy'
});

pdf.create(html, options).toFile('./newfile.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/newfile.pdf' }
});
