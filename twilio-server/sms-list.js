const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require("body-parser");
const port = 1337;
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

var todoList = [];

// THE PROBLEM APPARENTLY WAS THAT YOU NEED TO SEND THIS AS A POST REQUEST TO GET THE REQ.BODY.XXX FROM THE MESSAGE!!!

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    
    let msgBody = req.body.Body.split(' ');
    let command = msgBody[0].toLowerCase();
    let item = msgBody.slice(1).join(" ");
    console.log(`command: "${command}"\nitem "${item}"`)
    
    if (command === 'add') {
        console.log('inside add function');        
        todoList.push(item);
        console.log(todoList);
        twiml.message(`Added ${item}`);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    } else if (command === 'list') {
        console.log('list');
        //need to get the index of each item and put it in front of the itemm so a for loop may be necessary here (e.g. for x in todoList)
        let list = "";
        for (let i = 0; i < todoList.length; i++) {
            list += `${i+1}. ${todoList[i]}\n`;
        }
        twiml.message(list);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    } else if (command === 'remove') {
        let itemIndex = parseInt(item) - 1;
        todoList.splice(itemIndex, 1); 
        twiml.message(`Removed item #${item}`);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    } else {
        console.log(`incorrect command. MsgBody: \n${msgBody}`);
        twiml.message(`Sorry, I didn't understand. Please begin your message with one of the following commands: add, list, remove.`);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
    }


    // twiml.message(
    //   `Hi! It looks like your phone number was born in ${JSON.stringify(incoming)}`
    // );

    // r 
});

http.createServer(app).listen(port, () => {
    console.log(`Express server listening on ${port}`);
});