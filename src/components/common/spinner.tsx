import { FireIcon } from "@heroicons/react/24/solid";

export type SpinnerSize = "small" | "medium" | "large";

interface SpinnerProps {
  className?: string;
  size?: SpinnerSize;
}

const sizeMap: Record<SpinnerSize, string> = {
  small: "w-4 h-4",
  medium: "w-10 h-10",
  large: "w-16 h-16",
};

export function Spinner({ className, size = "medium" }: SpinnerProps) {
  return (
    <div>
      <FireIcon
        className={`animate-spin text-red-500 ${className} ${sizeMap[size]}`}
      />
    </div>
  );
}
