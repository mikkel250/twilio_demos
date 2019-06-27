const accountSid = "xxxx";
const authToken = "xxxx";
const client = require("twilio")(accountSid, authToken);

var date = new Date();

client.messages
  .create({
    from: "+14154771310",
    //mediaUrl: "https://amethyst-squid-3105.twil.io/assets/sms-code.png",
    body: `Greetings! The current time is: ${date} 1QLA2YKWR633UFK`,
    to: "+12092104311"
  })
  .then(message => console.log(message.sid));