import generateMessage from './helpers/messageGenerator';
import sendMessageViaTelegram from './strategies/telegram';
import sendMessageViaEmail from "./strategies/email";
import gitRep from "./helpers/gitRep";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/pipeline-trigger', (req, res) => {
  const {status, stages, finished_at} = req.body.object_attributes || {};

  if (status === 'success' && stages.includes('deploy_storybook_beta') && finished_at) {
    const message = generateMessage(req.body);
    sendMessageViaTelegram('-366551006', message);
    sendMessageViaEmail(message);
  } else {
    const message = JSON.stringify(req.body, null, 2);
    sendMessageViaTelegram('202147475', message);
  }
  res.status(200).send();
});

export default app;
