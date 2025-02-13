import React, { JSX } from "react";
import { cn } from "../../utils/cn";

type Variant =
  | "display"
  | "headerLarge"
  | "headerMedium"
  | "headerSmall"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodyBase"
  | "bodySmall"
  | "bodyXSmall"
  | "body2XSmall"
  | "body3XSmall";

type Weight = "bold" | "semi_bold" | "medium" | "normal" | "thin";

interface TextProps {
  variant?: Variant;
  weight?: Weight;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Text = ({
  variant = "bodyMedium",
  weight = "normal",
  children,
  className,
  style,
}: TextProps) => {
  const variantMap: Record<
    Variant,
    { element: keyof JSX.IntrinsicElements; styles: string }
  > = {
    display: {
      element: "h1",
      styles: "text-9xl",
    },
    headerLarge: {
      element: "h1",
      styles: "text-5xl md:text-8xl lg:text-9xl ",
    },
    headerMedium: {
      element: "h2",
      styles: "text-4xl md:text-6xl lg:text-7xl ",
    },
    headerSmall: {
      element: "h3",
      styles: "text-3xl md:text-4xl lg:text-5xl ",
    },
    titleLarge: { element: "h4", styles: "text-xl md:text-2xl lg:text-3xl" },
    titleMedium: { element: "h5", styles: "text-md md:text-lg" },
    titleSmall: { element: "h6", styles: "text-lg md:text-xl" },
    bodyLarge: { element: "p", styles: "text-lg" },
    bodyMedium: { element: "p", styles: "text-md" },
    bodyBase: { element: "p", styles: "text-base" },
    bodySmall: { element: "p", styles: "text-sm" },
    bodyXSmall: { element: "p", styles: "text-xs" },
    body2XSmall: { element: "p", styles: "text-2xs" },
    body3XSmall: { element: "p", styles: "text-3xs" },
  };

  const weightMap: Record<Weight, string> = {
    bold: "font-bold",
    semi_bold: "font-semibold",
    medium: "font-medium",
    normal: "font-normal",
    thin: "font-thin",
  };

  const { element: Element, styles } = variantMap[variant] || {
    element: "p",
    styles: "text-base",
  };
  const weightStyle = weightMap[weight] || "font-normal";

  return (
    <Element
      className={cn(`leading-6  ${styles} ${weightStyle} ${className}`)}
      style={style}
    >
      {children}
    </Element>
  );
};
