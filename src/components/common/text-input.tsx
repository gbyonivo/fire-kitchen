import { Input, Field, Label, Description } from "@headlessui/react";

import clsx from "clsx";

interface TextInputProps {
  label?: string;
  description?: string;
  className?: string;
  wrapperClassName?: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
}

export function TextInput({
  label,
  description,
  wrapperClassName,
  className,
  onChange,
  disabled,
  value,
}: TextInputProps) {
  return (
    <div className={clsx("w-full px-4", wrapperClassName)}>
      <Field>
        {label && (
          <Label className="text-sm/6 font-medium text-white">{label}</Label>
        )}
        {description && (
          <Description className="text-sm/6 text-white/50">
            {description}
          </Description>
        )}
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
            className
          )}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
        />
      </Field>
    </div>
  );
}
