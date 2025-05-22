import { renderHook, waitFor } from "@testing-library/react";
import { useIngredients } from "../use-ingredients";
import { KitchenAxios } from "@/utils/kitchen-axios";
import { useSelector } from "react-redux";
import { setFetchingIngridientsError } from "@/lib/slices/cache-slice";
import { setIngridients } from "@/lib/slices/cache-slice";
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
      ingridients: [],
      fetchingIngridients: false,
      fetchingIngridientsError: null,
      ingridientCache: {},
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [] },
    });
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingridients: [],
        fetchIngridients: expect.any(Function),
        fetching: false,
        error: null,
        ingridientCache: {},
      })
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        setFetchingIngridientsError("Invalid data")
      )
    );
  });

  // TODO: remove error from app state and leave in hook
  it("should catch error and set error in app state", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingridients: [],
      fetchingIngridients: false,
      fetchingIngridientsError: null,
      ingridientCache: {},
    });
    jest.spyOn(KitchenAxios, "get").mockRejectedValue(new AxiosError());
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingridients: [],
        fetchIngridients: expect.any(Function),
        fetching: false,
        // null until next render
        error: null,
        ingridientCache: {},
      })
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        setFetchingIngridientsError(new AxiosError())
      )
    );
  });

  it("should set ingridients in app state", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingridients: [],
      fetchingIngridients: false,
      fetchingIngridientsError: null,
      ingridientCache: {},
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [{ idIngredient: "1", strIngredient: "Test" }] },
    });
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingridients: [],
        fetchIngridients: expect.any(Function),
        fetching: false,
        error: null,
        ingridientCache: {},
      })
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        setIngridients({
          list: [{ id: "1", ingredient: "Test" }],
          record: { Test: { id: "1", ingredient: "Test" } },
        })
      )
    );
  });

  it("not make request if ingridients are in cache", async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      ingridients: [{ id: "1", ingredient: "Test" }],
      fetchingIngridients: false,
      fetchingIngridientsError: null,
      ingridientCache: { Test: { id: "1", ingredient: "Test" } },
    });
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [{ idIngredient: "1", strIngredient: "Test" }] },
    });
    const { result } = renderHook(() => useIngredients());
    await waitFor(() =>
      expect(result.current).toEqual({
        ingridients: [{ id: "1", ingredient: "Test" }],
        fetchIngridients: expect.any(Function),
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
