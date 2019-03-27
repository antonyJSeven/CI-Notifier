import bot from './bot';
import generateMessage from './util/messageGenerator';
import sendMessageViaTelegram from './strategies/telegram';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
bot.launch();

app.use(bodyParser.json());

// just for test purposes
app.get('/', (req, res) => {
  sendMessageViaTelegram('initial load');
  res.send('Hello World!');
});

app.post('/pipeline-trigger', (req, res) => {
  console.log('req.body', req.body);
  const message = generateMessage(req.body);
  console.log('message---->', message);
  sendMessageViaTelegram(message);
  res.status(200);
  res.send();
});

export default app;
