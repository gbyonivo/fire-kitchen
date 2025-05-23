import { render } from "@testing-library/react";
import { Spinner, SpinnerSize } from "../spinner";

describe("Spinner", () => {
  test.each([[undefined], ["small"], ["medium"], ["large"]])(
    "%s should match snapshot",
    (size) => {
      const { container } = render(<Spinner size={size as SpinnerSize} />);
      expect(container).toMatchSnapshot();
    }
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
});
