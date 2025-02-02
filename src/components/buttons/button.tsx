import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { LucideLoader2 } from "lucide-react";

import { cn } from "../../utils/cn";

type Variant = keyof typeof buttonVariants;
type Size = keyof typeof sizeVariants;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const buttonVariants = {
  primary:
    "bg-secondary-400 text-white hover:bg-secondary-500 disabled:bg-neutral-300",
  outline:
    "border-secondary-400 text-secondary-400 hover:text-secondary-500 hover:border-secondary-500",
};

const sizeVariants = {
  sm: "py-2 px-3 rounded-sm",
  md: "py-3 px-5 rounded-lg",
  lg: "py-4 px-8 rounded-lg",
};

export const Button: React.FC<ButtonProps> = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      disabled = false,
      loading = false,
      size = "md",
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
          "focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-xs md:text-sm lg:text-base font-medium",
          buttonVariants[variant],
          sizeVariants[size],
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
