import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface MultiSelectProps<T> {
  options: T[];
  selectedOptions: T[];
  onChange: (options: T[]) => void;
  getLabel: (option: T) => string;
  getKey: (option: T) => string;
}

export function MultiSelect<T>({
  options,
  selectedOptions,
  onChange,
  getKey,
  getLabel,
}: MultiSelectProps<T>) {
  return (
    <div className="mx-auto h-screen w-52 pt-2">
      <Listbox value={selectedOptions} onChange={onChange} multiple>
        <Label className="block text-sm/6 font-medium text-gray-400">
          Assigned to
        </Label>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white min-h-8",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          )}
        >
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div
                key={getKey(option)}
                className="rounded-lg bg-white/10 px-2 py-1 text-sm/6 text-white"
              >
                {getLabel(option)}
              </div>
            ))}
          </div>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--button-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0"
          )}
        >
          {options.map((option) => (
            <ListboxOption
              key={getKey(option)}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
              <div className="text-sm/6 text-white">{getLabel(option)}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
