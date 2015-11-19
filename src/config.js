let config = new Map();

const defaultConfig = {
  apiEndpoint: 'https://mechanicalturk.sandbox.amazonaws.com', // default is sandbox!
  workerProxyServer: 'https://mocos.kitchen' // call workerProxyServer.reconnect after change this
};
for (let key in defaultConfig) {
  if (config.get(key) === undefined) {
    config.set(key, defaultConfig[key]);
  }
}

export default config;
