import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../../utils/cn";
import { Icons } from "../../../Icons/index";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "children"
  > {
  options: RadioOption[];
  name: string;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  options,
  name,
  className,
  ...props
}) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      name={name}
      {...props} // Spread the rest of the props to the RadioGroupPrimitive.Root component
    >
      {options.map(({ label, value, disabled }) => (
        <label
          key={value}
          className={cn(
            "flex items-center gap-2 cursor-pointer text-xs md:text-base",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <RadioGroupPrimitive.Item
            value={value}
            disabled={disabled}
            className="h-6 w-6 rounded-full border border-primary-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <Icons.Circle className="h-4 w-4 fill-primary-400" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          {label}
        </label>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

Radio.displayName = "Radio";
