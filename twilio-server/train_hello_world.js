require("dotenv").config();
// account info
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const assistantSid = process.env.ASSISTANT_SID;

const client = require("twilio")(accountSid, authToken);

phrases = ["hello", "hi", "Hello", "Hi there"];

phrases.forEach(function (item) {
    sample = client.autopilot.assistants(`${assistantSid}`)
        .tasks('giphy').samples.create({ language: 'en-us', taggedText: item, }).then(sample => console.log(sample.sid)).done();
})