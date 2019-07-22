const http = require('http');
const request = require('request');
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

  
function getGif(gifUrl) {
  request(gifUrl, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
   
    bitlyUrl = body.data.url;
    console.log(`bitlyUrl from getGif: ${bitlyUrl}`);
    //return bitlyUrl;
  });
}

var bitlyUrl = "global";

app.post('/sms', (req, res) => {
  const smsCount = req.session.counter || 0;
  var responseBody =
      "Hi there! I'm a chatbot that's here to make you smile! Send me a one word reply with your favorite animal and I'll send you a surprise!";
  

    
    let msgBody = req.body.Body;
    var command = msgBody.toLowerCase();
    console.log(`command: ${command}\n`)

  req.session.counter = smsCount + 1;
  const twiml = new MessagingResponse();
  const reply = twiml.message();

  if (smsCount > 0) {
    console.log("inside if statement\n");
    var gif = `http://api.giphy.com/v1/gifs/random?api_key=OTnzF45UALo0lm41EI1fTCBiTV1v789i&tag=${command}&limit=1`;
    responseBody = `Here's a ${command}, hope you like it!\nSend any other word you'd like and I'll try to find you another cool gif!`;
    
    request(gif, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      //bitlyUrl = body.data.url;
      console.log(`bitlyUrl from request func bitly assignment: ${bitlyUrl}`);
      // return bitlyUrl;
    });
console.log(`bitlyUrl from request func outside and after the if: ${bitlyUrl}`);
    
    reply.media(bitlyUrl);
    console.log(reply.media);
    //reply.body(responseBody);
    //const twiml = new MessagingResponse();

    // reply.body(responseBody);
    // reply.media(bitlyUrl);
    // res.setHeader("Content-Type", "text/xml");
    // res.send(twiml.toString());
    
  } else {
  
  
  // if (bitlyUrl.length > 1) {
    //console.log('triggered bitly IF');
    //const reply = twiml.message();
    reply.body(responseBody);
    //reply.mediaUrl(bitlyUrl);
    
  // } else {
    // const reply = twiml.message();
    // reply.body(responseBody);
  //res.setHeader("Content-Type", "text/xml");
  //res.send(twiml.toString());
  }
  res.setHeader("Content-Type", "text/xml");
  res.send(twiml.toString());

});


http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});