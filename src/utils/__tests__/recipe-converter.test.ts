import { convertRecipe } from "../recipe-converter";

const completeResponse = {
  idMeal: "1",
  strMeal: "Test",
  strCategory: "Test",
  strArea: "Test",
  strIngredient1: "soy sauce",
  strIngredient2: "water",
  strMeasure1: "3/4 cup",
  strMeasure2: "1/2 cup",
  strInstructions: "Test",
  strMealThumb: "Test",
  strTags: "Test",
  strYoutube: "Test",
};

const completeResult = {
  id: "1",
  name: "Test",
  category: "Test",
  area: "Test",
  ingredients: [
    {
      name: "soy sauce",
      measure: "3/4 cup",
    },
    {
      name: "water",
      measure: "1/2 cup",
    },
  ],
  instructions: "Test",
  thumbnail: "Test",
  tags: ["Test"],
  youtube: "Test",
};

describe("convertRecipe", () => {
  test.each([[completeResponse, completeResult]])(
    "should convert %s to %s",
    (responseFromApi, result) => {
      const recipe = convertRecipe(responseFromApi);
      expect(recipe).toMatchObject(result);
    }
  );
  test.each([[{}], [{ ...completeResponse, idMeal: null }], [null], [""]])(
    "should convert %s to null",
    (responseFromApi) => {
      const recipe = convertRecipe(responseFromApi);
      expect(recipe).toBeNull();
    }
  );

  test.each([
    [
      { ...completeResponse, strIngredient2: null },
      {
        ...completeResult,
        ingredients: [{ name: "soy sauce", measure: "3/4 cup" }],
      },
    ],
    [
      { ...completeResponse, strIngredient1: null, strIngredient2: null },
      {
        ...completeResult,
        ingredients: [],
      },
    ],
    [
      {
        ...completeResponse,
        strIngredient1: null,
        strIngredient2: null,
        strIngredient20: "test 20",
        strIngredient21: "test 21",
      },
      {
        ...completeResult,
        ingredients: [{ name: "test 20", measure: null }],
      },
    ],
  ])("ingrideients  - should convert %s to %s", (responseFromApi, expected) => {
    const recipe = convertRecipe(responseFromApi);
    expect(recipe).toEqual(expected);
  });
});
