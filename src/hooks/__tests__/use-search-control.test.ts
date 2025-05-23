import { act, renderHook, waitFor } from "@testing-library/react";
import { useSearchControl } from "../use-search-control";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useIngredients } from "@/hooks/use-ingredients";
import { useSearch } from "@/hooks/use-search";
import { createQueryString } from "@/utils/common";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("@/hooks/use-ingredients", () => ({
  useIngredients: jest.fn(),
}));
jest.mock("@/hooks/use-search", () => ({
  useSearch: jest.fn(),
}));
jest.mock("@/utils/common", () => ({
  createQueryString: jest.fn(),
}));

describe("useSearchControl", () => {
  const routerPush = jest.fn();
  const searchParamsGet = jest.fn();
  searchParamsGet.mockImplementation((param) => {
    if (param === "ingredients") return "chicken,beef";
    if (param === "search") return "search";
    return "";
  });
  (usePathname as unknown as jest.Mock).mockReturnValue("");
  (useRouter as unknown as jest.Mock).mockReturnValue({
    push: routerPush,
  });
  (useSearchParams as unknown as jest.Mock).mockReturnValue({
    get: searchParamsGet,
  });
  (useIngredients as unknown as jest.Mock).mockReturnValue({
    ingridientCache: {
      chicken: { id: 1, name: "chicken" },
      beef: { id: 2, name: "beef" },
    },
  });
  (useSearch as unknown as jest.Mock).mockReturnValue({
    searchRecipe: jest.fn(),
  });

  it("should throw error if recipe is not found", () => {
    const { result } = renderHook(() => useSearchControl());

    expect(result.current.initialIngredients).toEqual([
      { id: 1, name: "chicken" },
      { id: 2, name: "beef" },
    ]);
    expect(result.current.initialSearchValue).toBe("search");
  });

  it("should throw error if recipe is not found", async () => {
    const { result } = renderHook(() => useSearchControl());
    (usePathname as unknown as jest.Mock).mockReturnValue("/search");
    searchParamsGet.mockImplementation(() => "");
    (createQueryString as unknown as jest.Mock).mockReturnValue(
      "search=chicken&ingredients=1"
    );

    act(() => {
      result.current.onSetParams({
        search: "chicken",
        ingredients: [{ id: "1", ingredient: "chicken" }],
      });
    });

    await waitFor(() =>
      expect(routerPush).toHaveBeenCalledWith(
        "/search?search=chicken&ingredients=1"
      )
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
