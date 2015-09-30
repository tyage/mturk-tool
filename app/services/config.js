class Config {
  get(key) {
    return window.localStorage.getItem(key);
  }
  set(key, value) {
    return window.localStorage.setItem(key, value);
  }
};

export default (new Config());
