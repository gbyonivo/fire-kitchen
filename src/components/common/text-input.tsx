import { Input, Field, Label, Description } from "@headlessui/react";

import clsx from "clsx";
import { forwardRef } from "react";

interface TextInputProps {
  label?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  testId?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      description,
      containerClassName,
      className,
      onChange,
      disabled,
      value,
      testId,
    }: TextInputProps,
    ref
  ) {
    return (
      <div className={clsx(containerClassName)} data-testid={testId}>
        <Field>
          {label && (
            <Label className="block text-sm/6 font-medium text-gray-400">
              {label}
            </Label>
          )}
          {description && (
            <Description className="text-sm/6 text-white/50">
              {description}
            </Description>
          )}
          <Input
            className={clsx(
              "h-10 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
              className
            )}
            onChange={(e) => {
              e.preventDefault();
              onChange(e.target.value);
            }}
            value={value}
            disabled={disabled}
            ref={ref}
          />
        </Field>
      </div>
    );
  }
);
