let config = new Map();

let defaultConfig = {
  apiEndpoint: 'https://mechanicalturk.sandbox.amazonaws.com',
  workerEndpoint: 'https://workersandbox.mturk.com',
  workerContentEndpoint: 'https://workersandbox.mturkcontent.com',
  questionScript: 'https://mocos.kitchen/question.js',
  questionControllerServer: 'http://mocos.kitchen' // call questionController.reconnect after change this
};
for (let key in defaultConfig) {
  if (config.get(key) === null) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
