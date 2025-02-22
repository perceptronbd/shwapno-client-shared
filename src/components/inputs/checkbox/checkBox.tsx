import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../utils/cn";
import { Check } from "lucide-react";
import { Text } from "../../texts/text";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  asRef?: React.ForwardedRef<HTMLButtonElement>;
  className?: string;
  label?: string;
}

export const Checkbox = ({
  className,
  label,
  asRef,
  ...props
}: CheckboxProps) => (
  <div className="flex items-center gap-2">
    <CheckboxPrimitive.Root
      ref={asRef}
      className={cn(
        "rounded-xs border-primary-500 focus-visible:ring-ring data-[state=checked]:bg-primary-400 data-[state=checked]:text-primary-foreground disabled:data-[state=checked]:bg-primary-200 peer h-6 w-6 shrink-0 border focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && <Text variant="bodyBase">{label}</Text>}
  </div>
);

Checkbox.displayName = "Checkbox";
