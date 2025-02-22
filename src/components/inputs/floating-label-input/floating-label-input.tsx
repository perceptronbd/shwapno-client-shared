"use client";

import React, { ComponentPropsWithoutRef, useState, useCallback } from "react";
import { cn } from "../../../utils/cn";
import { AlertCircle, Eye, EyeOffIcon } from "lucide-react";

interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "ref"> {
  errorMessage?: string;
  label?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const FloatingLabelInput = ({
  className,
  type = "text",
  errorMessage,
  label,
  Icon,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const togglePassword = useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  );

  return (
    <div className="w-full">
      <div className="relative w-full">
        {Icon && (
          <span
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
              isFocused ? "text-primary-400" : "text-neutral-200",
            )}
          >
            <Icon />
          </span>
        )}

        <input
          type={inputType}
          autoComplete="off"
          {...props}
          className={cn(
            "rounded-base text-primary-400 focus:text-primary-400 focus:outline-primary-400 peer block w-full border py-3 pr-4 placeholder:text-transparent focus:border-none focus:ring-1",
            errorMessage ? "border-red-500" : "border-neutral-200",
            Icon ? "pl-12" : "pl-3",
            className,
          )}
          aria-invalid={!!errorMessage}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {label && (
          <label
            className={cn(
              "peer-focus:text-primary-400 absolute top-3 origin-[0] -translate-y-6 scale-75 transform bg-white px-1 text-base text-neutral-300 duration-300 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white",
              Icon ? "left-12" : "left-3",
            )}
          >
            {label}
          </label>
        )}

        {type === "password" && (
          <button
            type="button"
            className="hover:text-primary-400 absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={18} /> : <EyeOffIcon size={18} />}
          </button>
        )}
      </div>

      {errorMessage && (
        <span
          role="alert"
          className="mt-2 flex w-full items-center gap-2 rounded-sm bg-red-200 px-4 py-2 text-xs text-red-500"
        >
          <AlertCircle size={15} className="text-red-500" />
          {errorMessage}
        </span>
      )}
    </div>
  );
};

FloatingLabelInput.displayName = "FloatingLabelInput";
