const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_KEY);
bot.launch();

const sendMessageViaTelegram = (chatId, text) => bot.telegram.sendMessage(chatId, text);

export default sendMessageViaTelegram;
