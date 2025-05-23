import { renderHook, act, waitFor } from "@testing-library/react";
import { useSearch } from "../use-search";
import {
  setSearching,
  searchSuccess,
  searchError,
} from "@/lib/slices/search-slice";
import { KitchenAxios } from "@/utils/kitchen-axios";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("@/utils/kitchen-axios");

describe("useSearch", () => {
  it("should hit search endpoint but not filter endpoint", async () => {
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [] },
    });
    const { result } = renderHook(() => useSearch());
    act(() => {
      result.current.searchRecipe([], "search");
    });
    await waitFor(() =>
      expect(KitchenAxios.get).toHaveBeenCalledWith("/search.php", {
        params: {
          s: "search",
        },
      })
    );
    await waitFor(() =>
      expect(KitchenAxios.get).not.toHaveBeenCalledWith("/filter.php", {
        params: {
          i: "",
        },
      })
    );
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(setSearching())
    );
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(searchSuccess([]))
    );
  });

  it("should hit filter endpoint but not search endpoint", async () => {
    jest.spyOn(KitchenAxios, "get").mockResolvedValue({
      data: { meals: [] },
    });
    const { result } = renderHook(() => useSearch());
    act(() => {
      result.current.searchRecipe(
        [
          { ingredient: "chicken", id: "1" },
          { ingredient: "garlic", id: "2" },
        ],
        "s"
      );
    });
    await waitFor(() =>
      expect(KitchenAxios.get).not.toHaveBeenCalledWith("/search.php", {
        params: {
          s: "s",
        },
      })
    );
    await waitFor(() =>
      expect(KitchenAxios.get).toHaveBeenCalledWith("filter.php", {
        params: {
          i: "chicken,garlic",
        },
      })
    );
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(setSearching())
    );
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(searchSuccess([]))
    );
  });

  it("should hit filter endpoint but not search endpoint", async () => {
    jest.spyOn(KitchenAxios, "get").mockRejectedValue("error");
    const { result } = renderHook(() => useSearch());
    act(() => {
      result.current.searchRecipe(
        [
          { ingredient: "chicken", id: "1" },
          { ingredient: "garlic", id: "2" },
        ],
        "s"
      );
    });
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(setSearching())
    );
    await waitFor(() =>
      expect(mockDispatch).not.toHaveBeenCalledWith(searchSuccess([]))
    );
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        searchError("We couldn't find any recipes")
      )
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
