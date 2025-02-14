import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../utils/cn";

interface SwitchProps extends SwitchPrimitive.SwitchProps {
  className?: string;
  thumbClassName?: string;
  disabled?: boolean;
}

export const Switch = ({
  className,
  thumbClassName,
  disabled,
  ...props
}: SwitchProps) => (
  <SwitchPrimitive.Root
    className={cn(
      "border-primary-400 data-[state=checked]:bg-primary-400 disabled:border-primary-200 relative h-6 w-10 cursor-pointer rounded-full border-2 disabled:cursor-not-allowed disabled:data-[state=checked]:bg-neutral-300",
      className,
    )}
    disabled={disabled}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block size-5 translate-x-0.5 rounded-full bg-white shadow-[1px_2px_5px_2px_rgba(0,0,0,0.1)] transition-transform duration-300 will-change-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-white disabled:data-[state=checked]:bg-neutral-300",

        thumbClassName,
      )}
    />
  </SwitchPrimitive.Root>
);
