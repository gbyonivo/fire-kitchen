import {
  convertIngredient,
  convertIngredientList,
} from "../ingridient-converter";

describe("convertIngredient", () => {
  test.each([
    [
      {
        strIngredient: "soy sauce",
      },
    ],
    [{ idIngredient: "1" }],
  ])("should convert %s to null", (raw) => {
    expect(convertIngredient(raw)).toBeNull();
  });

  test.each([
    [
      [
        {
          strIngredient: "soy sauce",
        },
        {},
      ],
      {
        list: [],
        record: {},
      },
    ],
    [
      [{ idIngredient: "1" }],
      {
        list: [],
        record: {},
      },
    ],
    [
      [
        {
          idIngredient: "1",
          strIngredient: "soy sauce",
          strDescription: "Test",
          strType: "Vegan",
        },
      ],
      {
        list: [
          {
            id: "1",
            ingredient: "soy sauce",
            description: "Test",
            type: "Vegan",
          },
        ],
        record: {
          "soy sauce": {
            id: "1",
            ingredient: "soy sauce",
            description: "Test",
            type: "Vegan",
          },
        },
      },
    ],
  ])("should convert %s to %s", (list, expected) => {
    expect(convertIngredientList(list)).toEqual(expected);
  });
});
