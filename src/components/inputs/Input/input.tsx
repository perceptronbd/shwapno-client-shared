import React, { FC, InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

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
        "border text-primary-400 border-primary-100 focus:outline-primary-200  py-3 px-4 w-full text-base  placeholder-bold rounded-2xl placeholder:text-base",
        className,
        inputStyle
      )}
    />
  );
};

Input.displayName = "Input";
