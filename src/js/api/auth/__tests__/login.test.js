import { save } from "../../../storage";
import { login } from "../login";

jest.mock("../../../storage/index.js");

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

const failureResponse = (status = "401", statusText = "Unauthorized") => {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
};

const fetchSuccessMock = jest.fn(() => successResponse());
const fetchFailureMock = jest.fn(() => failureResponse());

describe("login", () => {
  it("logs in the user with valid credentials and saves the token", async () => {
    global.fetch = fetchSuccessMock;
    const profile = await login();
    const { token } = profile;
    save("token", token);
    expect(save).toHaveBeenCalledWith("token", token);
  });

  it("throws an error when user types in invalid credentials", async () => {
    global.fetch = fetchFailureMock;
    await expect(login()).rejects.toThrow("Unauthorized");
  });
});
