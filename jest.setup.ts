import "@testing-library/jest-dom";

// @ts-expect-error - test
global.ResizeObserver = class FakeResizeObserver {
  observe() {}
  disconnect() {}
};
