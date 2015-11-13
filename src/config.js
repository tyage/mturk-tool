let config = new Map();

let defaultConfig = {
  apiEndpoint: 'https://mechanicalturk.sandbox.amazonaws.com', // default is sandbox!
  questionControllerServer: 'https://mocos.kitchen' // call questionController.reconnect after change this
};
for (let key in defaultConfig) {
  if (config.get(key) === undefined) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
