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

// parse application/json
//app.use(bodyParser.json());

var todoList = [];

// THE PROBLEM APPARENTLY WAS THAT YOU NEED TO SEND THIS AS A __POST__ REQUEST TO GET THE REQ.BODY.XXX FROM THE MESSAGE!!! A GET request will return undefined.

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    
    let msgBody = req.body.Body.split(' ');
    let command = msgBody[0].toLowerCase();
    let item = msgBody.slice(1).join(" ");
    console.log(`command: "${command}"\nitem "${item}"`)
    
    if (command === 'add') {            
        todoList.push(item);
        twiml.message(`Added ${item}`);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());

    } else if (command === 'list') {
        let list = "";
        for (let i = 0; i < todoList.length; i++) {
            list += `${i+1}. ${todoList[i]}\n`;
        }
        twiml.message(list);
        
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());

        const response = new MessagingResponse();
        response.message(
          {
            action: "/status",
            method: "POST"
          },
          "subscribed. need to include X-Twilio-Signature and sid too."
        );
        console.log(response.toString());

    } else if (command === 'remove') {
        let itemIndex = parseInt(item) - 1;
        todoList.splice(itemIndex, 1); 
        twiml.message(`Removed item #${item}`);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    } else {
        twiml.message(`Sorry, I didn't understand. Please begin your message with one of the following commands: add, list, remove.`);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    }
});

app.post('/status', (req, res) => {
    //const twiml = new MessagingResponse();
    const messageSid =
        req.body
        .MessageSid;
    const messageStatus =
        req.body
            .MessageStatus;
    if (messageStatus != 'qeued' || messageStatus != 'failed' || messageStatus != 'sent' || messageStatus != 'delivered' || messageStatus != 'undelivered') {
        console.log(`SID: ${messageSid}, Status: ${messageStatus}`); 
        // NEED to add the X-Twilio-Signature to this message as part of the requirements.
        res.sendStatus(200);
    } else {
        console.log('undexpected value. Returned from messageStatus: \n ' + messageStatus);
    }

    // console.log(
    //     `SID: ${messageSid}, Status: ${messageStatus}`
    // );
    // res.sendStatus(
    //     200
    // );

});

http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});