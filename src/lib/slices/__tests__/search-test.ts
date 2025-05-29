import reducer, { setSearching } from "../search-slice";

const initialState = {
  searching: false,
  error: null,
  recipes: [],
};

describe("sliceFile reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setSearching", () => {
    const prevState = { ...initialState };
    expect(reducer(prevState, setSearching())).toEqual({
      ...prevState,
      searching: true,
    });
  });
});
