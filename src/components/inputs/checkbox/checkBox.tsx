import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../../utils/cn";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  asRef: React.ForwardedRef<HTMLButtonElement>;
  className?: string;
}

export const Checkbox = ({ className, asRef, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    ref={asRef}
    className={cn(
      "peer h-6 w-6 shrink-0 rounded-md border border-primary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-400 data-[state=checked]:text-primary-foreground disabled:border-neutral-300 disabled:data-[state=checked]:bg-primary-200",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

Checkbox.displayName = "Checkbox";
