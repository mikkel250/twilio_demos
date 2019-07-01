require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNum = process.env.MY_NUMBER;
const client = require("twilio")(accountSid, authToken);

var date = new Date();

client.messages
  .create({
    from: myNum,
    //mediaUrl: "https://amethyst-squid-3105.twil.io/assets/sms-code.png",
    body: `Greetings! The current time is: ${date} KSI0KYB47D96XX1`,
    to: "+12092104311"
  })
  .then(message => console.log(message.sid));