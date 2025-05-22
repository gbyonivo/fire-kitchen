import { createQueryString } from "../common";

describe("createQueryString", () => {
  test.each([
    [
      [
        { name: "test", value: "test" },
        { name: "test1", value: "test1" },
      ],
      "test=test&test1=test1",
    ],
    [[{ name: "test", value: "test" }], "test=test"],
  ])("should create a query string", (nameValuePairs, expected) => {
    const queryString = createQueryString({
      nameValuePairs,
      searchParams: new URLSearchParams(),
    });
    expect(queryString).toBe(expected);
  });
});
