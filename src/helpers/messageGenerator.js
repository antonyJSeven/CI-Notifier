import config from './eikonConfig';
import { appListRegularStrings } from '../model';

const generateMessage = (data) => {
  const {
    object_attributes,
    user,
    project,
    commit,
  } = data;
  console.log(JSON.stringify(data, undefined, 2));

  const parseCommit = message => appListRegularStrings.map((app) => {
    const regexp = new RegExp(`${app}`);
    return regexp.test(message) ? app : null;
  }).filter(Boolean);

  const environment = object_attributes.stages.includes('build_alpha') ? 'alpha' : 'beta';

  const generateVersionLink = (appName, env) => `${appName}:${object_attributes.tag}-->${config[`${env}`].path}/web/Apps/${appName}/${object_attributes.tag}`;

  const generateVersionLinkPart = () => {
    const appNamesList = parseCommit(commit.message);
    if (appNamesList.length > 0) {
      return appNamesList.map(app => generateVersionLink(app, environment)).join('\n');
    }
    return ['LunaStorybook', 'LunaPlayground', 'MessageMonitor'].map(app => generateVersionLink(app, environment)).join('\n');
  };

  const startedPart = env => `Application has been successfully deployed on ${env}. Author: ${commit.author.name}`;

  const changes = () => `Here the list what have been changed:
  ${commit.message}`;

  return `
  🚀🚀🚀 New deployment has arrived 🚀🚀🚀
  
  ${startedPart(environment)}
  
  ${changes()}
  🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉
  ${generateVersionLinkPart()}
  🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉`;
};

export default generateMessage;
