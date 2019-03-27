import generateMessage from './helpers/messageGenerator';
import sendMessageViaTelegram from './strategies/telegram';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// just for test purposes
app.get('/', (req, res) => {
  sendMessageViaTelegram('-366551006', 'initial load');
  res.send('Hello World!');
});

app.post('/pipeline-trigger', (req, res) => {
  console.log('req.body', req.body);
  const { status, stages } = req.body.object_attributes || {};
  if (status === 'success') {
    const message = generateMessage(req.body);
    console.log('message---->', message);
    sendMessageViaTelegram('-366551006', message);
    res.status(200).send();
  } else {
    const message = JSON.stringify(req.body, null, 2);
    sendMessageViaTelegram('202147475', message);
  }
});

export default app;
