const Telegraf = require('telegraf');

const bot = new Telegraf('772938491:AAGe91PaFh4zcSuBmGHTsb-F_xs4wkPto7c');
bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', (ctx) => { console.log('ctx---->', ctx.chat); return ctx.reply('Hey there'); });
bot.telegram.sendMessage('202147475', 'hey ho');

export default bot
