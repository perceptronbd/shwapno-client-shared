import React, { HtmlHTMLAttributes, FC } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import { Icons } from "../../Icons/index";

type Variant = keyof typeof chipsVariants;
type rounded = keyof typeof roundedRadius;

interface ChipsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  rounded?: rounded;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  close?: boolean;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  onClose?: HtmlHTMLAttributes<SVGSVGElement>["onClick"];
}

const chipsVariants = {
  primary: { style: "bg-primary-100 text-black", label: "Primary" },
  success: { style: "bg-success-200 text-success-500", label: "Success" },
  error: { style: "bg-error-200 text-error-500", label: "Error" },
  warning: { style: "bg-warning-200 text-warning-500", label: "Warning" },
  disabled: { style: "bg-neutral-200 text-neutral-500", label: "Disabled" },
};

const roundedRadius = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Chips: FC<ChipsProps> = ({
  className,
  children,
  variant = "primary",
  disabled = false,
  asChild = false,
  close = false,
  onClose,
  rounded = "sm",
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  const { style, label } = chipsVariants[variant];

  return (
    <Comp
      className={cn(
        "focus-visible:ring-ring inline-flex items-center justify-center gap-1 whitespace-nowrap ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm font-normal px-3 py-2",
        roundedRadius[rounded],
        style,
        className
      )}
      ref={ref}
      {...props}
    >
      {children || label}
      {close && (
        <Icons.LucideX onClick={onClose} aria-label="Dismiss" size={14} />
      )}
    </Comp>
  );
};

Chips.displayName = "Chips";
