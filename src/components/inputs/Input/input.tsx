import React, { FC, InputHTMLAttributes } from "react";
import { cn } from "src/utils/cn";
import { customFontSizes } from "src/utils/customFontSize";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputStyle?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export const Input: FC<InputProps> = ({
  className,
  inputStyle,
  ref,
  ...props
}) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        "border text-black h-14 w-full pl-4 placeholder-bold rounded-2xl placeholder:text-sm",
        className,
        inputStyle
      )}
    />
  );
};

Input.displayName = "Input";

customFontSizes;
