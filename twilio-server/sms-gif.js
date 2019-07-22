const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require("body-parser");
const port = 1337;
const app = express();
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// THE PROBLEM APPARENTLY WAS THAT YOU NEED TO SEND THIS AS A __POST__ REQUEST TO GET THE REQ.BODY.XXX FROM THE MESSAGE!!! A GET request will return undefined.

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    // first, send a greeting, then start a while loop? Or put the ifs inside a while (command != exit, stop)
    // other option would be to do an if 
    let msgBody = req.body.Body;
    let command = msgBody.toLowerCase();
    let gif = `http://api.giphy.com/v1/gifs/random?api_key=OTnzF45UALo0lm41EI1fTCBiTV1v789i&tag=${command}&limit=1`;
    //let item = msgBody.slice(1).join(" ");
    console.log(`command: ${command}`)

    while (
      typeof command === 'string' &&
      (command != "stop" || command != "end")
    ) {
        console.log("inside while statement\n");
        twiml.message(
          "Hi there! I'm a chatbot that's here to make you smile! Send me a one word reply with your favorite animal and I'll send you a surprise! \nSend STOP or END to exit."
        );

        res.writeHead(200, { "Content-Type": "text/xml" });
        res.send(twiml.toString());

        // (command.includes('hi' || 'hello', "what's up" || "how's it going" || 'hey' || 'hey there' || 'start'))
        if (command) {
          console.log("inside if statement\n");
          twiml.message(
            "Hi there! I'm a chatbot that's here to make you smile! Send me a one word reply with your favorite animal and I'll send you a surprise! \nSend STOP or END to exit."
          );
          res.writeHead(200, { "Content-Type": "text/xml" });
          res.send(twiml.toString());
        } else if (command === typeof String || command.length < 3) {
          twiml.message(
            `Here's a ${command}, hope you like it!\nSend any other word you'd like and I'll try to find you another cool gif!`
          );
          message.media(gif);
          res.writeHead(200, { "Content-Type": "text/xml" });
          res.send(twiml.toString());
        } else {
          twiml.message(
            `Sorry, I didn't understand, or couldn't find what you're looking for. Please reply with something (else) you'd like to see.`
          );
          res.writeHead(200, { "Content-Type": "text/xml" });
          res.send(twiml.toString());
        }
      }
  res.end();
    // if (command === typeof String) {            
    //     twiml.message(`Here's a ${command}, hope you like it!\nSend any other word you'd like and I'll try to find you another cool gif!`);
    //     message.media(gif);
    //     res.writeHead(200, { "Content-Type": "text/xml" });
    //     res.end(twiml.toString());   
    // } else {
    //     twiml.message(`Sorry, I didn't understand, or couldn't find what you're looking for. Please reply with something (else) you'd like to see.`);
    //     res.writeHead(200, { "Content-Type": "text/xml" });
    //     res.end(twiml.toString());
    // }
});


http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});