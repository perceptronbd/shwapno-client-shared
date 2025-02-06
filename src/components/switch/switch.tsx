import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../utils/cn";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  thumbClassName?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className,
  thumbClassName,
  disabled,
  ...props
}) => (
  <SwitchPrimitive.Root
    className={cn(
      "relative h-6 w-10 cursor-pointer rounded-full border-2 border-primary-400 data-[state=checked]:bg-primary-400 disabled:cursor-not-allowed disabled:border-primary-200 disabled:data-[state=checked]:bg-neutral-300",
      className
    )}
    disabled={disabled}
    checked={checked}
    onCheckedChange={onCheckedChange}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block size-5 translate-x-0.5 rounded-full transition-transform duration-300 will-change-transform bg-white data-[state=checked]:bg-white data-[state=checked]:translate-x-4 shadow-[1px_2px_5px_2px_rgba(0,0,0,0.1)] disabled:data-[state=checked]:bg-neutral-300",

        thumbClassName
      )}
    />
  </SwitchPrimitive.Root>
);
