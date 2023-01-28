import { save } from "../../../storage";
import { login } from "../login";

jest.mock("../../../storage/index.js", () => {
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

  return {
    save: jest.fn((key, value) => global.localStorage.setItem(key, value)),
    load: jest.fn((key) => global.localStorage.getItem(key)),
  };
});

const successResponse = (status = "200", statusText = "Ok") => {
  return Promise.resolve({
    ok: true,
    status,
    statusText,
    json: () =>
      Promise.resolve({
        name: "validUser",
        email: "validUser@stud.noroff.no",
        token: "token",
      }),
  });
};

const fetchSuccessMock = jest.fn(() => successResponse());

describe("login", () => {
  it("logs in the user and saves the token and profile", async () => {
    global.fetch = fetchSuccessMock;
    const profile = await login();
    const { token } = profile;
    save("token", token);
    expect(save).toHaveBeenCalledWith("token", token);
  });
});
