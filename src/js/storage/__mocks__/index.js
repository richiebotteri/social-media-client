class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

module.exports = {
  save: jest.fn((key, value) => global.localStorage.setItem(key, value)),
  load: jest.fn((key) => global.localStorage.getItem(key)),
  remove: jest.fn((key) => global.localStorage.removeItem(key)),
};
