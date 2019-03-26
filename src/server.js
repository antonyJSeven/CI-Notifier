import bot from './bot';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
bot.launch();

app.use(bodyParser.json());

// just for test purposes
app.get('/', (req, res) => {
  bot.telegram.sendMessage('202147475', 'hey ho');
  res.send('Hello World!');
});

app.post('/pipeline-trigger', (req, res) => {
  console.log('req', req);
  console.log('req.body', req.body);
  bot.telegram.sendMessage('202147475', `hey ho ${Date.now()}`);
  res.status(200);
  res.send();
});

export default app
