require("dotenv").config();
// account info
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const assistantSid = process.env.ASSISTANT_SID;

const client = require("twilio")(accountSid, authToken);

client.autopilot
  .assistants(`${assistantSid}`)
  .defaults()
  .update({
    defaults: {
      defaults: {
        assistant_initiation: "task://hello-world",
        fallback: "task://hello-world"
      }
    }
  })
  .then(defaults => console.log(defaults.assistantSid));