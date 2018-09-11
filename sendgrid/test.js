var request = require("request");

var options = { method: 'GET',
  url: 'https://api.sendgrid.com/v3/templates/%7Bd-a83df809215a4e8e8098d3d4a07425a1%7D',
  headers: { authorization: 'Bearer 6ARkUXMUTG64t2iJEHtRAQ' },
  body: '{}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
