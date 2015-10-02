class Config {
  get(key) {
    return window.localStorage.getItem(key);
  }
  set(key, value) {
    return window.localStorage.setItem(key, value);
  }
};

let config = new Config();

let defaultConfig = {
  apiEndpoint: 'https://mechanicalturk.sandbox.amazonaws.com',
  workerEndpoint: 'https://workersandbox.mturk.com',
  workerContentEndpoint: 'https://workersandbox.mturkcontent.com'
};
for (let key in defaultConfig) {
  if (config.get(key) === null) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
