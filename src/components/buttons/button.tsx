import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { LucideLoader2 } from "lucide-react";

import { cn } from "../../utils/cn";

type Variant = "primary" | "outline" | "destructive";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      disabled = false,
      loading = false,
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-red-500 text-white hover:bg-red-500/90":
              variant === "destructive",
            "bg-purple-500 text-white hover:bg-purple-500/90 ":
              variant === "primary",
            "border border-black h-10 text-primary-purple":
              variant === "outline",
          },
          {
            "h-10 px-4 py-2": size === "default" && variant !== "outline",
            "h-9 px-3": size === "sm" && variant !== "outline",
            "h-11 px-8": size === "lg" && variant !== "outline",
            "h-10 w-10": size === "icon" && variant !== "outline",
          },
          className
        )}
        disabled={disabled || loading}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {loading ? (
          <>
            <div className="flex h-4 w-4 animate-spin items-center justify-center rounded-full">
              <LucideLoader2 />
            </div>
            {children && <span>{children}</span>}
          </>
        ) : (
          <>{children}</>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
