import { render, screen, waitFor } from "@testing-library/react";
import { Recipe } from "@/types/recipe";
import { useRecipe } from "@/hooks/use-recipe";
import { configureStore } from "@reduxjs/toolkit";
import { RecipeContainer } from "../recipe-container";
import { Provider } from "react-redux";
import cacheReducer from "@/lib/slices/cache-slice";
import searchReducer from "@/lib/slices/search-slice";
import { useParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

const store = configureStore({
  reducer: {
    cache: cacheReducer,
    search: searchReducer,
  },
});

jest.mock("@/hooks/use-recipe");
jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

const useRecipeReturnValue: {
  recipe: Recipe;
  loading: boolean;
  error: Error | null;
} = {
  recipe: {
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
    thumbnail: "/images/test.jpg",
    tags: [],
    youtube: "Test",
  },
  loading: false,
  error: null,
};

describe("RecipeContainer", () => {
  test.each([
    [useRecipeReturnValue],
    [
      {
        ...useRecipeReturnValue,
        loading: true,
        error: null,
      },
    ],
    [
      {
        ...useRecipeReturnValue,
        loading: false,
        error: new Error("Test"),
      },
    ],
    [
      {
        ...useRecipeReturnValue,
        recipe: null,
        loading: false,
        error: new Error("Test"),
      },
    ],
    [
      {
        ...useRecipeReturnValue,
        recipe: null,
        loading: true,
        error: false,
      },
    ],
  ])("%s should match snapshot", async (returnValue) => {
    (useRecipe as unknown as jest.Mock).mockReturnValue(returnValue);
    (useParams as unknown as jest.Mock).mockReturnValue({ id: "1" });
    const { container } = render(
      <Provider store={store}>
        <RecipeContainer />
      </Provider>
    );
    await userEvent.hover(screen.getByTestId("recipe-container"));
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
