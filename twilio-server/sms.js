require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNum = process.env.MY_NUMBER;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    from: myNum,
    mediaUrl: "https://amethyst-squid-3105.twil.io/assets/sms-code.png",
    body:
      "Thank you from Mikkel Ridley for a pleasant interview. This message sent from the Twilio API.",
    to: "+14158902735"
  })
  .then(message => console.log(message.sid));