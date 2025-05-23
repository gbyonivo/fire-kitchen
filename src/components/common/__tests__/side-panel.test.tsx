import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SidePanel } from "../side-panel";

describe("SidePanel", () => {
  test.each([[true], [false]])("%s should match snapshot", async (open) => {
    const onClose = jest.fn();
    const { container } = render(
      <SidePanel title="Test" open={open} onClose={onClose} id="test-id">
        <div>Test</div>
      </SidePanel>
    );

    if (open) {
      await userEvent.hover(screen.getByTestId("test-id"));
    }
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
