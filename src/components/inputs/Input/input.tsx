import React, { InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputStyle?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export const Input = ({ className, inputStyle, ref, ...props }: InputProps) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        "text-primary-400 border-primary-100 focus:outline-primary-200 placeholder-bold rounded-base w-full border px-4 py-3 text-base placeholder:text-base",
        className,
        inputStyle,
      )}
    />
  );
};

Input.displayName = "Input";
