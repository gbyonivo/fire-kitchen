import { render } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  test.each([
    [{ disabled: false, loading: false }],
    [{ disabled: true, loading: true }],
  ])("%s should match snapshot", ({ disabled, loading }) => {
    const onClick = jest.fn();
    const { container } = render(
      <Button onClick={onClick} disabled={disabled} loading={loading}>
        Test
      </Button>
    );
    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
