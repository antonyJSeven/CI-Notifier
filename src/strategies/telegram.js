const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_KEY);

const sendMessageViaTelegram = text => bot.telegram.sendMessage('202147475', text);
export default sendMessageViaTelegram;
