const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require("body-parser");

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
// app.use(bodyParser.json());

app.get('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    let incoming = req.query.FromCountry;

    console.log(`request body: ${incoming}`);
    //console.log(req);

    twiml.message(
      `Hi! It looks like your phone number was born in ${JSON.stringify(incoming)}`
    );

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});