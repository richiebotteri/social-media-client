import { logout } from "../logout";
import { remove } from "../../../storage";

jest.mock("../../../storage/index.js");

describe("logout", () => {
  it("removes the token from storage", () => {
    logout();
    expect(remove).toHaveBeenCalled();
    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledTimes(2);
  });
});
