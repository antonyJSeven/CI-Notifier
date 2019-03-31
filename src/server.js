import generateMessage from './helpers/messageGenerator';
import sendMessageViaTelegram from './strategies/telegram';
import sendMessageViaEmail from "./strategies/email";
import gitRep from "./helpers/gitRep";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/pipeline-trigger', (req, res) => {
  const { status, stages, finished_at } = req.body.object_attributes || {};
  gitRep.getLastTag()
    .then(version => {
      if (status === 'success' && stages.includes('deploy_storybook_beta') && finished_at) {
        const message = generateMessage(req.body, version);
        sendMessageViaTelegram('-366551006', message);
        sendMessageViaEmail(message);
        res.status(200).send();
      } else {
        const message = JSON.stringify(req.body, null, 2);
        sendMessageViaTelegram('202147475', message);
      }
    })
  .catch(e => sendMessageViaTelegram('202147475', JSON.stringify(e, null, 2)))
});

export default app;
