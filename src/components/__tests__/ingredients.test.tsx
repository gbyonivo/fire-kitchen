import { fireEvent, render } from "@testing-library/react";
import { Ingredients } from "../ingredients";
import { useIngredients } from "@/hooks/use-ingredients";
import { Recipe } from "@/types/recipe";

jest.mock("@/hooks/use-ingredients");

const mockedRecipe: Recipe = {
  id: "1",
  name: "Test",
  ingredients: [
    {
      name: "Name Test",
      measure: "Measure Test",
    },
  ],
  category: "Test",
  area: "Test",
  instructions: "Test",
  thumbnail: "Test",
  tags: [],
  youtube: "Test",
};

// TODO: Sidepanel should show when ingredient is clicked

describe("Ingredients", () => {
  test.each([
    [
      {
        "Name Test": {
          id: "1",
          name: "Name Test",
          measure: "Measure Test",
          description: "Description Test",
        },
      },
    ],
    [{}],
  ])("%s should match snapshot", async (cache) => {
    (useIngredients as unknown as jest.Mock).mockReturnValue({
      ingredients: [],
      fetching: false,
      error: null,
      fetchIngredients: jest.fn(),
      ingridientCache: cache,
    });
    const { container } = render(<Ingredients recipe={mockedRecipe} />);
    expect(container).toMatchSnapshot();
  });

  test.each([
    [
      {
        "Name Test": {
          id: "1",
          name: "Name Test",
          measure: "Measure Test",
          description: "Description Test",
        },
      },
    ],
    [{}],
  ])("%s should match snapshot after ingredient is clicked", async (cache) => {
    (useIngredients as unknown as jest.Mock).mockReturnValue({
      ingredients: [],
      fetching: false,
      error: null,
      fetchIngredients: jest.fn(),
      ingridientCache: cache,
    });
    const { container } = render(<Ingredients recipe={mockedRecipe} />);
    const ingredient = container.querySelector(
      `[data-testid="ingredient-Name Test-Measure Test"]`
    );
    if (ingredient) {
      fireEvent.click(ingredient);
    }
    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
