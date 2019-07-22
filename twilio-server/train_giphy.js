require("dotenv").config();
// account info
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myNumber = process.env.MY_NUMBER;
const assistantSid = process.env.ASSISTANT_SID;

const client = require("twilio")(accountSid, authToken);

animals = [
    "bat",
    "badger",
    "bear",
    "bird",
    "bulldog",
    "butterfly",
    "camel",
    "cat",
    "caterpillar",
    "chicken",
    "chihuahua",
    "corgi",
    "cow",
    "crab",
    "deer",
    "dog",
    "dragon",
    "duck",
    "eagle",
    "echidna",
    "elephant",
    "ferret",
    "fish",
    "frog",
    "giraffe",
    "goat",
    "grumpy cat",
    "hamster",
    "hedgehog",
    "hippo",
    "horse",
    "insect",
    "jellyfish",
    "kangaroo",
    "koala",
    "lion",
    "lizard",
    "lobster",
    "maru",
    "monkey",
    "mouse",
    "octopus",
    "otter",
    "owl",
    "panda",
    "penguin",
    "pig",
    "polar bear",
    "poodle",
    "porcupine",
    "praying mantis",
    "pug",
    "rabbit",
    "raccoon",
    "red panda",
    "seal",
    "shark",
    "sheep",
    "skunk",
    "sloth",
    "spider",
    "squirrel",
    "starfish",
    "tiger",
    "turtle",
    "unicorn",
    "whale",
    "wolf",
];

phrases.forEach(function (item) {
    sample = client.autopilot.assistants(`${assistantSid}`)
        .tasks('giphy').samples.create({ language: 'en-us', taggedText: item, }).then(sample => console.log(sample.sid)).done();
})