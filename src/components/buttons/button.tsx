import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Icons } from "../../icons";

import { cn } from "../../utils/cn";

type Variant = keyof typeof buttonVariants;
type Size = keyof typeof sizeVariants;

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  asChild?: boolean;
}

const buttonVariants = {
  primary:
    "bg-secondary-400 text-white hover:bg-secondary-500",
  outline:
    "border border-secondary-400 text-secondary-400 hover:text-secondary-500 hover:border-secondary-500",
  link: "text-secondary-400 hover:text-secondary-500 hover:underline",
  text: "text-secondary-400 hover:text-secondary-500",
};

const sizeVariants = {
  sm: "py-2 px-3 rounded-xs text-xs",
  md: "py-3 px-5 rounded-sm text-sm",
  lg: "py-4 px-8 rounded-sm text-base",
  icon: "p-1 rounded-xs",
};

export const Button = ({
  variant = "primary",
  className,
  loading = false,
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "focus-visible:ring-ring ring-offset-background inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        sizeVariants[size],
        className,
      )}
      disabled={props.disabled || loading}
      data-loading={loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="flex h-4 w-4 animate-spin items-center justify-center rounded-full">
            <Icons.Loader />
          </div>
          {children && <span>{children}</span>}
        </>
      ) : (
        <>{children}</>
      )}
    </Comp>
  );
};

Button.displayName = "Button";
