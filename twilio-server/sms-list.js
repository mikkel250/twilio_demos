const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require("body-parser");

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var todoList = [];


app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    //let incoming = req.query;
    let msg = req.body.Body;
    let msgBody = msg.toLowerCase();
    let command = msgBody[0];
    let item = msgBody.slice(1);
    
    if (command === 'add') {
        console.log('add');        
        todoList.push(item);
        twiml.message(`Added ${item}`);

    } else if (command === 'list') {
        console.log('list');
        twiml.message(`${todoList.forEach}`)
    } else if (command === 'remove') {
        console.log('remove');
    } else {
        console.log(`incorrect command. MsgBody: \n${msgBody}`);
        twiml.message(`Sorry, I didn't understand. Please begin your message with one of the following commands: add, list, remove.`)
    }
 

    // twiml.message(
    //   `Hi! It looks like your phone number was born in ${JSON.stringify(incoming)}`
    // );

    // r 
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});