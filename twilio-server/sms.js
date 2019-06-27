const accountSid = "AC2e6915033aa6953cbc990d2228d59217";
const authToken = "8f561880c9aa9c5552c9b7c5157efe24";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    from: "+14154771310",
    mediaUrl: "https://amethyst-squid-3105.twil.io/assets/sms-code.png",
    body:
      "Thank you from Mikkel Ridley for a pleasant interview. This message sent from the Twilio API.",
    to: "+14158902735"
  })
  .then(message => console.log(message.sid));