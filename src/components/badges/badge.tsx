import { FC } from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../utils/cn";

type Variant = keyof typeof badgeVariants;

interface BadgeProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const badgeVariants = {
  primary: { style: "bg-primary-100 text-black", text: "Primary" },
  success: { style: "bg-success-200 text-success-500", text: "Success" },
  error: { style: "bg-error-200 text-error-500", text: "Error" },
  warning: { style: "bg-warning-200 text-warning-500", text: "Warning" },
  disabled: { style: "bg-neutral-200 text-neutral-500", text: "Disabled" },
};

export const Badge: FC<BadgeProps> = ({
  className,
  children,
  variant = "primary",
  disabled = false,
  asChild = false,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : "div";
  const { style, text } = badgeVariants[variant];

  return (
    <Comp
      className={cn(
        "focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-sm font-normal p-1 rounded-2xl",
        style,
        className
      )}
      ref={ref}
      {...props}
    >
      {children || text}
    </Comp>
  );
};

Badge.displayName = "Badge";
