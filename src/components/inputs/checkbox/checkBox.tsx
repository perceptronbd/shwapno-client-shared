import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../utils/cn";
import { Icons } from "../../../icons/index";
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
        "peer h-6 w-6 shrink-0 rounded-xs border border-primary-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-400 data-[state=checked]:text-primary-foreground disabled:border-neutral-300 disabled:data-[state=checked]:bg-primary-200",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        <Icons.Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && <Text variant="bodyBase">{label}</Text>}
  </div>
);

Checkbox.displayName = "Checkbox";
