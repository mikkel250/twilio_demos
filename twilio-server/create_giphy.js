const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
var bodyParser = require("body-parser");
const port = 1337;
const app = express();
require("dotenv").config();
// account info
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const assistantSid = process.env.ASSISTANT_SID;

const client = require("twilio")(accountSid, authToken);

giphyTaskActions = {
    actions: [
        { say: 'Hi there! I\'m a chatbot that\'s here to make you smile! Send me a one word reply with what you\'d like to see and I\'ll send you a surprise!' },
        { listen: true }
    ]
};

// create the task 
client.autopilot.assistants(`${assistantSid}`)
    .tasks
    .create({
        uniqueName: 'giphy',
        actions: giphyTaskActions,
    })
    .then(assistant => console.log(assistant.sid))
    .done();