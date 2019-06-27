// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = "xxx";
const authToken = "xxx";
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    method: "GET",
    sendDigits: "2605",
    url: "https://handler.twilio.com/twiml/EHdcf6001b0411de789cb90aeec79e4a2d",
    to: "+14158902735",
    from: "+14154771310"
  })
  .then(call => console.log(call.sid));
