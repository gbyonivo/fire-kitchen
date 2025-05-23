import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { TextInput } from "./text-input";
import { useMemo, useState } from "react";

export interface MultiSelectProps<T> {
  options: T[];
  selectedOptions: T[];
  onChange: (options: T[]) => void;
  getLabel: (option: T) => string;
  getKey: (option: T) => string;
  getSearchKey: (option: T) => string;
  label?: string;
  containerClassName?: string;
}

export function MultiSelect<T>({
  options,
  selectedOptions,
  onChange,
  getKey,
  getLabel,
  getSearchKey,
  label,
  containerClassName,
}: MultiSelectProps<T>) {
  const [search, setSearch] = useState("");
  const displayedOptions = useMemo(() => {
    return options.filter((option) =>
      getSearchKey(option).toLowerCase().includes(search.toLowerCase())
    );
  }, [options, getSearchKey, search]);

  return (
    <div className={containerClassName}>
      <Listbox value={selectedOptions} onChange={onChange} multiple>
        {label && (
          <Label className="block text-sm/6 font-medium text-gray-400">
            {label}
          </Label>
        )}
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white min-h-10",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          )}
        >
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div
                key={getKey(option)}
                className="rounded-lg bg-white/10 px-2 py-1 text-sm/6 text-white h-6 text-xs"
                onClick={() => {
                  onChange(selectedOptions.filter((o) => o !== option));
                }}
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
            "w-(--button-width) rounded-xl border border-white/5 bg-black p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0"
          )}
        >
          <TextInput value={search} onChange={(value) => setSearch(value)} />
          <div className="h-64 overflow-y-auto py-4">
            {displayedOptions.map((option) => (
              <ListboxOption
                key={getKey(option)}
                value={option}
                className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                <div className="text-sm/6 text-white">{getLabel(option)}</div>
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
