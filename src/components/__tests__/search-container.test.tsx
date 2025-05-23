// import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useIngredients } from "@/hooks/use-ingredients";
import { useSearchControl } from "@/hooks/use-search-control";
import { render, screen, waitFor } from "@testing-library/react";
import { SearchContainer } from "../search-container";
import userEvent from "@testing-library/user-event";
// import { SearchContainer } from "../search-container";

jest.mock("@/hooks/use-ingredients");
jest.mock("@/hooks/use-search-control");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// add more tests when there is result on the screen

describe("SearchContainer", () => {
  test.each([
    [{ initialIngredients: [], initialSearchValue: "Chicken", called: true }],
    [{ initialIngredients: [], initialSearchValue: "", called: false }],
  ])(
    "should match snapshot and onSetParams should be called when search button is clicked",
    async ({ initialIngredients, initialSearchValue, called }) => {
      const onSetParams = jest.fn();
      (useSelector as unknown as jest.Mock).mockReturnValue({
        recipes: [],
        searching: false,
      });
      (useIngredients as unknown as jest.Mock).mockReturnValue({
        ingredients: [],
        ingridientCache: {},
      });
      (useSearchControl as unknown as jest.Mock).mockReturnValue({
        onSetParams,
        initialIngredients,
        initialSearchValue,
      });
      const { container } = render(<SearchContainer />);
      await userEvent.click(screen.getByTestId("search-button"));
      await waitFor(() => {
        if (called) {
          expect(onSetParams).toHaveBeenCalled();
        } else {
          expect(onSetParams).not.toHaveBeenCalled();
        }
      });
      await waitFor(() => {
        expect(container).toMatchSnapshot();
      });
    }
  );

  test("should match snapshot and button should be disabled when searching", async () => {
    const onSetParams = jest.fn();
    (useSelector as unknown as jest.Mock).mockReturnValue({
      recipes: [],
      searching: true,
    });
    (useIngredients as unknown as jest.Mock).mockReturnValue({
      ingredients: [],
      ingridientCache: {},
    });
    (useSearchControl as unknown as jest.Mock).mockReturnValue({
      onSetParams,
      initialIngredients: [],
      initialSearchValue: "",
    });
    expect(1).toBe(1);
    const { container } = render(<SearchContainer />);

    await userEvent.click(screen.getByTestId("search-button"));
    await waitFor(() => {
      expect(onSetParams).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
