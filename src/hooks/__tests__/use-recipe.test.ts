import { renderHook, waitFor } from "@testing-library/react";
import { useRecipe } from "../use-recipe";
import { KitchenAxios } from "@/utils/kitchen-axios";
import { useSelector } from "react-redux";
import { AxiosError } from "axios";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("@/utils/kitchen-axios");

describe("useRecipe", () => {
  it("should throw error if recipe is not found", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({});
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [] },
    });
    const { result } = renderHook(() => useRecipe({ recipeId: "1" }));
    await waitFor(() =>
      expect(result.current).toEqual({
        recipe: undefined,
        fetchRecipe: expect.any(Function),
        loading: false,
        error: new AxiosError("Recipe not found"),
      })
    );
  });

  it("should get recipe from response from endpoint", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({});
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [{ idMeal: "1", strMeal: "Test Recipe" }] },
    });
    const { result } = renderHook(() => useRecipe({ recipeId: "1" }));
    await waitFor(() =>
      expect(result.current).toEqual({
        recipe: undefined,
        fetchRecipe: expect.any(Function),
        loading: false,
        error: null,
      })
    );
  });

  it("should get recipe from cache and not hit endpoint", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      id: {
        id: "1",
      },
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [] },
    });
    const { result } = renderHook(() => useRecipe({ recipeId: "id" }));
    await waitFor(() =>
      expect(result.current).toEqual({
        recipe: {
          id: "1",
        },
        fetchRecipe: expect.any(Function),
        loading: false,
        error: null,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
