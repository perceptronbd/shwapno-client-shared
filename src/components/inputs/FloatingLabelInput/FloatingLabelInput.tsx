"use client";

import React, { ForwardedRef, InputHTMLAttributes, JSX, useState } from "react";
import { cn } from "../../../utils/cn";
import { Icons } from "../../../Icons/index";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  isIcon?: boolean;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const FloatingLabelInput: React.FC<InputProps> = React.forwardRef(
  (
    {
      className,
      id,
      name,
      placeholder,
      type = "text",
      errorMessage,
      label,
      isIcon,
      Icon,
      ...props
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="flex items-center relative">
        {isIcon && Icon && (
          <div
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
              isFocused ? "text-primary-400" : "text-neutral-200"
            )}
          >
            <Icon />
          </div>
        )}
        <div>
          <input
            id={id}
            name={name}
            type={inputType}
            placeholder={placeholder}
            autoComplete="off"
            {...props}
            className={cn(
              "peer block min-w-60 rounded-base border pr-4  py-3 pl-10 text-primary-400 placeholder:text-transparent focus:border-none focus:text-primary-400 focus:outline-primary-400 focus:ring-1 h-full focus:text-base",
              errorMessage ? "border-red-500" : "border-neutral-200",
              isIcon ? "pl-12" : "pl-3",
              className
            )}
            ref={ref}
            aria-invalid={!!errorMessage}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-1 text-base text-neutral-300 duration-300 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-primary-400",
                isIcon ? "left-12" : "left-3"
              )}
            >
              {label}
            </label>
          )}

          {type === "password" && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-400"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Icons.Eye size={18} />
              ) : (
                <Icons.EyeOffIcon size={18} />
              )}
            </button>
          )}

          {errorMessage && (
            <span className="mt-2 block w-full gap-2 rounded-sm bg-red-200 px-4 py-2 text-xs text-red-500">
              <div className="flex items-center gap-2">
                <Icons.AlertCircle size={15} className="text-red-500" />
                {errorMessage}
              </div>
            </span>
          )}
        </div>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";
