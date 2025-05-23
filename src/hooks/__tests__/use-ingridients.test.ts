import { renderHook, waitFor } from "@testing-library/react";
import { useIngredients } from "../use-ingredients";
import { KitchenAxios } from "@/utils/kitchen-axios";
import { useSelector } from "react-redux";
import { setFetchingIngredientsError } from "@/lib/slices/cache-slice";
import { setIngredients } from "@/lib/slices/cache-slice";
import { AxiosError } from "axios";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("@/utils/kitchen-axios");

describe("useIngredients", () => {
  it("should return set error as Invalid data and return current items in state", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingredients: [],
      fetchingIngredients: false,
      fetchingIngredientsError: null,
      ingridientCache: {},
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [] },
    });
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingredients: [],
        fetchIngredients: expect.any(Function),
        fetching: false,
        error: null,
        ingridientCache: {},
      })
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        setFetchingIngredientsError("Invalid data")
      )
    );
  });

  // TODO: remove error from app state and leave in hook
  it("should catch error and set error in app state", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingredients: [],
      fetchingIngredients: false,
      fetchingIngredientsError: null,
      ingridientCache: {},
    });
    jest.spyOn(KitchenAxios, "get").mockRejectedValue(new AxiosError());
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingredients: [],
        fetchIngredients: expect.any(Function),
        fetching: false,
        // null until next render
        error: null,
        ingridientCache: {},
      })
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        setFetchingIngredientsError(new AxiosError())
      )
    );
  });

  it("should set ingredients in app state", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingredients: [],
      fetchingIngredients: false,
      fetchingIngredientsError: null,
      ingridientCache: {},
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [{ idIngredient: "1", strIngredient: "Test" }] },
    });
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingredients: [],
        fetchIngredients: expect.any(Function),
        fetching: false,
        error: null,
        ingridientCache: {},
      })
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        setIngredients({
          list: [{ id: "1", ingredient: "Test" }],
          record: { Test: { id: "1", ingredient: "Test" } },
        })
      )
    );
  });

  it("not make request if ingredients are in cache", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingredients: [{ id: "1", ingredient: "Test" }],
      fetchingIngredients: false,
      fetchingIngredientsError: null,
      ingridientCache: { Test: { id: "1", ingredient: "Test" } },
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [{ idIngredient: "1", strIngredient: "Test" }] },
    });
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingredients: [{ id: "1", ingredient: "Test" }],
        fetchIngredients: expect.any(Function),
        fetching: false,
        error: null,
        ingridientCache: { Test: { id: "1", ingredient: "Test" } },
      })
    );

    await waitFor(() => expect(mockDispatch).not.toHaveBeenCalled());
    await waitFor(() => expect(KitchenAxios.get).not.toHaveBeenCalled());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
