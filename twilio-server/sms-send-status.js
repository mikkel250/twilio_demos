require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: `Note that you can't copy and paste the url from postbin's dashboard, you have to remove the /b/ from the address!`,
    statusCallback: "https://postb.in/1562196885562-0179494428448",
    from: myNumber,
    to: +4158902735
  })
  .then(message => console.log(message.sid));