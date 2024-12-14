const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
console.log(process.env.TELEGRAM_TOKEN);

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on("message", (msg) => {
  console.log("Message Received:", msg); // Logs the text of the message

  bot.sendMessage(msg.chat.id, "Hello, i am a bot. I am here to help you out");
});

bot.onText("/joke", async (msg) => {
  const respone = await axios.get(
    "http://www.official-joke-api.appspot.com/random_joke"
  );
  const setup = respone.data.setup;
  const punchline = respone.data.punchline;

  console.log(respone);

  bot.sendMessage(msg.chat.id, setup + " " + punchline);
});
