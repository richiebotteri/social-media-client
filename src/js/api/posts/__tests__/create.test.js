import { createPost } from "../create";

const successResponse = (status = "200", statusText = "Ok") => {
  return Promise.resolve({
    ok: true,
    status,
    statusText,
    json: () =>
      Promise.resolve({
        id: 1,
        title: "valid title",
        body: "valid body",
        media: "valid media",
        tags: "valid tags",
      }),
  });
};

const failureResponse = (status = "400", statusText = "Bad Request") => {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
};

const fetchSuccessMock = jest.fn(() => successResponse());
const fetchFailureMock = jest.fn(() => failureResponse());

describe("createPost", () => {
  it("returns a valid item with a valid input", async () => {
    global.fetch = fetchSuccessMock;
    const response = createPost();
    const validItem = await response;
    expect(validItem).toEqual({
      id: 1,
      title: "valid title",
      body: "valid body",
      media: "valid media",
      tags: "valid tags",
    });
    expect(fetchSuccessMock).toHaveBeenCalledTimes(1);
  });

  it("rejects a post if inputs are invalid", async () => {
    global.fetch = fetchFailureMock;
    await expect(createPost()).rejects.toThrow("Bad Request");
    expect(fetchFailureMock).toHaveBeenCalledTimes(1);
  });
});
