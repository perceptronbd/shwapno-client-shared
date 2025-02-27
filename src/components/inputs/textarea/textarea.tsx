import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils/cn";
import { AlertCircle } from "lucide-react";

interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "ref"> {
  className?: string;
  inputStyle?: string;
  error?: string;
}

export const Textarea = ({
  error,
  className,
  inputStyle,
  ...props
}: TextareaProps) => {
  return (
    <>
      <textarea
        {...props}
        className={cn(
          "text-primary-400 border-primary-100 placeholder-bold rounded-base w-full border px-4 py-3 text-base placeholder:text-base",
          className,
          inputStyle,
        )}
      />
      {error && (
        <span
          role="alert"
          className="mt-2 flex w-full items-center gap-2 rounded-sm bg-red-200 px-4 py-2 text-xs text-red-500"
        >
          <AlertCircle size={15} className="text-red-500" />
          {error}
        </span>
      )}
    </>
  );
};

Textarea.displayName = "Textarea";
