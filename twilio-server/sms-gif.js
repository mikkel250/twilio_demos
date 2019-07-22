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

app.use(session({secret: process.env.SESSION_SECRET}))

// THE PROBLEM APPARENTLY WAS THAT YOU NEED TO SEND THIS AS A __POST__ REQUEST TO GET THE REQ.BODY.XXX FROM THE MESSAGE!!! A GET request will return undefined.

app.post('/sms', (req, res) => {
  const smsCount = req.session.counter || 0;
  let message =
    "Hi there! I'm a chatbot that's here to make you smile! Send me a one word reply with your favorite animal and I'll send you a surprise! \nSend STOP or END to exit.";
  
  const twiml = new MessagingResponse();
  
    // first, send a greeting, then start a while loop? Or put the ifs inside a while (command != exit, stop)
    // other option would be to do an if 
    let msgBody = req.body.Body;
    let command = msgBody.toLowerCase();
    let gif = `http://api.giphy.com/v1/gifs/random?api_key=OTnzF45UALo0lm41EI1fTCBiTV1v789i&tag=${command}&limit=1`;
    //let item = msgBody.slice(1).join(" ");
    console.log(`command: ${command}`)

        if (smsCount > 0) {
          console.log("inside if statement\n");
          message = `Here's a ${command}, hope you like it!\nSend any other word you'd like and I'll try to find you another cool gif!`;
        }
  req.session.counter = smsCount + 1;
  const twiml = new MessagingResponse();
  message.media(gif);
  twiml.message(message);
  res.writeHead(200, { "Content-Type": "text/xml" });
  res.send(twiml.toString());

});


http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});