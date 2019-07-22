const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
var bodyParser = require("body-parser");
const port = 1337;
const app = express();
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const assistantSid = process.env.ASSISTANT_SID;
const client = require('twilio')(accountSid, authToken);

client.autopilot.assistants
                .create({
                   friendlyName: 'Quickstart Assistant',
                   uniqueName: 'quickstart-assistant'
                 })
                .then(assistant => console.log(assistant.sid));