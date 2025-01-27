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
  | "bodyXlarge"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "bodyXsmall";

type Weight = "bold" | "normal" | "thin";

interface TextProps {
  variant?: Variant;
  weight?: Weight;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  variant = "bodyMedium",
  weight = "normal",
  children,
  className,
  style,
}) => {
  const variantMap: Record<
    Variant,
    { element: keyof JSX.IntrinsicElements; styles: string }
  > = {
    display: {
      element: "h1",
      styles: "text-4xl md:text-5xl lg:text-7xl ",
    },
    headerLarge: {
      element: "h1",
      styles: "text-4xl md:text-5xl lg:text-6xl ",
    },
    headerMedium: {
      element: "h2",
      styles: "text-3xl md:text-[44px] lg:text-[48px] ",
    },
    headerSmall: {
      element: "h3",
      styles: "text-2xl md:text-3xl lg:text-4xl ",
    },
    titleLarge: { element: "h4", styles: "text-lg md:text-xl lg:text-2xl" },
    titleMedium: { element: "h5", styles: "text-md md:text-lg" },
    titleSmall: { element: "h6", styles: "text-[18px] md:text-md" },
    bodyXlarge: { element: "p", styles: "text-lg" },
    bodyLarge: { element: "p", styles: "text-lg " },
    bodyMedium: { element: "p", styles: "text-base" },
    bodySmall: { element: "p", styles: "text-sm" },
    bodyXsmall: { element: "p", styles: "text-xs" },
  };

  const weightMap: Record<Weight, string> = {
    bold: "font-semibold",
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
      className={cn(`leading-6 ${styles} ${weightStyle} ${className}`)}
      style={style}
    >
      {children}
    </Element>
  );
};
