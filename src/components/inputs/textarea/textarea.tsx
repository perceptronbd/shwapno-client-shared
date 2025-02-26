import React, { TextareaHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputStyle?: string;
  ref?: React.ForwardedRef<HTMLTextAreaElement>;
}

export const Input = ({
  className,
  inputStyle,
  ref,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={cn(
        "text-primary-400 border-primary-100 placeholder-bold rounded-base w-full border px-4 py-3 text-base placeholder:text-base",
        className,
        inputStyle,
      )}
    />
  );
};

Input.displayName = "Input";
