import React, { HtmlHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import { LucideX } from "lucide-react";

type Variant = keyof typeof chipsVariants;

interface ChipsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  onDismiss?: HtmlHTMLAttributes<SVGSVGElement>["onClick"];
}

const chipsVariants = {
  primary: { style: "bg-primary-100 text-black", label: "Primary" },
  success: { style: "bg-success-200 text-success-500", label: "Success" },
  error: { style: "bg-error-200 text-error-500", label: "Error" },
  warning: { style: "bg-warning-200 text-warning-500", label: "Warning" },
  disabled: { style: "bg-neutral-200 text-neutral-500", label: "Disabled" },
};

export const Chips: React.FC<ChipsProps> = ({
  className,
  children,
  variant = "primary",
  disabled = false,
  asChild = false,
  dismissible = false,
  onDismiss,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";
  const { style, label } = chipsVariants[variant];

  return (
    <Comp
      className={cn(
        "focus-visible:ring-ring inline-flex items-center justify-center gap-1 rounded-[0.8rem] whitespace-nowrap ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm font-normal px-3 py-2",
        style,
        className
      )}
      ref={ref}
      {...props}
    >
      {children || label}
      {dismissible && (
        <LucideX onClick={onDismiss} aria-label="Dismiss" className="cursor-pointer" size={14} />
      )}
    </Comp>
  );
};

Chips.displayName = "Chips";
