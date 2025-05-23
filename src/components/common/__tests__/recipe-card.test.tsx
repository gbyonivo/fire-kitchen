import { render } from "@testing-library/react";
import { RecipeCard } from "../recipe-card";
import { Recipe } from "@/types/recipe";

const recipe: Recipe = {
  id: "1",
  name: "Test",
  ingredients: [],
  category: "Test",
  area: "Test",
  instructions: "Test",
  thumbnail: "https://example.com/thumbnail.jpg",
  tags: [],
  youtube: "https://example.com/youtube.com",
};

describe("Spinner", () => {
  test.each([
    [recipe],
    // should truncate long text
    [{ ...recipe, name: "longtextlongtextlongtextlongtextlongtextlongtext" }],
  ])("%s should match snapshot", (recipe) => {
    const { container } = render(<RecipeCard recipe={recipe} />);
    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
