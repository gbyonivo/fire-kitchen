import { render } from "@testing-library/react";
import { MultiSelect, MultiSelectProps } from "../multi-select";

const optionsAsObjArray = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
];

const objProps: Partial<MultiSelectProps<{ id: string; name: string }>> = {
  options: optionsAsObjArray,
  getLabel: (option: { id: string; name: string }) => option.name,
  getKey: (option: { id: string; name: string }) => option.id,
  getSearchKey: (option: { id: string; name: string }) => option.name,
};

const optionsAsStrArray = optionsAsObjArray.map((option) => option.name);

const strProps: Partial<MultiSelectProps<string>> = {
  options: optionsAsStrArray,
  getLabel: (option: string) => option,
  getKey: (option: string) => option,
  getSearchKey: (option: string) => option,
};

describe("MultiSelect", () => {
  test.each([[strProps], [objProps]])("%s should match snapshot", (props) => {
    const onChange = jest.fn();
    const { container } = render(
      // @ts-expect-error - test
      <MultiSelect selectedOptions={[]} onChange={onChange} {...props} />
    );
    expect(container).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
