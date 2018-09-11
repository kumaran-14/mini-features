var request = require("request");

var options = { method: 'GET',
  url: 'https://api.sendgrid.com/v3/templates/d-a83df809215a4e8e8098d3d4a07425a1',
  headers: { authorization: 'Bearer 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' },
  body: '{}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(JSON.parse(body));
});
