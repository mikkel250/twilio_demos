require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNum = process.env.MY_NUMBER;const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    method: "GET",
    sendDigits: "2605",
    url: "https://handler.twilio.com/twiml/EHdcf6001b0411de789cb90aeec79e4a2d",
    to: "+14158902735",
    from: myNum
  })
  .then(call => console.log(call.sid));
