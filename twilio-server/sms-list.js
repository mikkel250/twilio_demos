const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require("body-parser");
const port = 1337;
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var todoList = [];

//the problem here is that it's not getting the body -- it's returning undefined

app.get('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    //let incoming = req.query;
    let msgBody = req.body.Body;
    console.log(msgBody);
   // let msgBody = msg.toLowerCase();
    let command = msgBody[0].toLowerCase();
    let item = msgBody.slice(1);
    console.log(`command\nmsgBody`)
    
    if (command === 'add') {
        console.log('add');        
        todoList.push(item);
        twiml.message(`Added ${item}`);

    } else if (command === 'list') {
        console.log('list');
        //need to get the index of each item and put it in front of the itemm so a for loop may be necessary here (e.g. for x in todoList)
        let list = "";
        for (let i = 0; i < todoList.length; i++) {
            list += `${i+1}. ${todoList[i]}\n`;
        }
        twiml.message(list)
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

http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});