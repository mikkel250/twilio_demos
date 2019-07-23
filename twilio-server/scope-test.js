const http = require('http');
const express = require('express');
const session = require('express-session');
var bodyParser = require("body-parser");
const port = 1337;

require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(session({secret: process.env.SESSION_SECRET}))


app.post('/sms', (req, res) => {
    var testVar = 'at the top'
    let msgBody = req.body.Body;
    let command = msgBody.toLowerCase();
    let gif = `http://api.giphy.com/v1/gifs/random?api_key=OTnzF45UALo0lm41EI1fTCBiTV1v789i&tag=${command}&limit=1`;
    //let item = msgBody.slice(1).join(" ");
    console.log(`command: ${command}...right before IF loop. testVar: ${testVar}`)

    if (testVar) {
           testVar = 'inside the IF loop'
          console.log("inside if statement\ntestVar: " + testVar);
          message = `Here's a ${command}, hope you like it!\nSend any other word you'd like and I'll try to find you another cool gif!`;
        }
 console.log('following IF looop. TestVar: ' + testVar )

});


http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});