// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'XXXX';
const authToken = 'YYYY';
const client = require('twilio')(accountSid, authToken);

client.calls
    .create({
        method: 'GET',
        sendDigits: '2605', 
        url: 'https://handler.twilio.com/twiml/EHdcf6001b0411de789cb90aeec79e4a2d',
         to: '+15105626450',
         from: '+14158902735'
       })
      .then(call => console.log(call.sid));
