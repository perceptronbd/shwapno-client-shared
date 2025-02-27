"use client";

import { useEffect } from "react";
import { AlertCircle, ImagePlus } from "lucide-react";
import Image from "next/image";
import { cn } from "../../../utils/cn";
import { Text } from "../../texts/text";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form";

type ErrorType =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<FieldValues>>
  | undefined;

interface ImageInputProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: ErrorType | string;
  className?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  value,
  onChange,
  error,
  className,
}) => {
  useEffect(() => {
    return () => {
      if (value instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(value)); // Clean up object URLs
      }
    };
  }, [value]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange(file);
    }
  };

  return (
    <div>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor="image-upload"
        className={cn(
          "xl:h-46 flex h-32 w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-400 bg-neutral-200 p-4 text-base text-neutral-600 hover:cursor-pointer sm:h-80",
          className,
        )}
      >
        {value ? (
          <Image
            height={100}
            width={100}
            src={URL.createObjectURL(value)}
            alt="Preview"
            className="w-1/3 rounded-lg border xl:w-1/5"
          />
        ) : (
          <>
            <ImagePlus size={48} color="#A3A3A3" />
            <Text className="mb-2 mt-2">Click or Drag and drop images</Text>
            <Text>PNG. Max size 5MB or 1000px</Text>
          </>
        )}
      </label>
      {error && (
        <span
          role="alert"
          className="mt-2 flex w-full items-center gap-2 rounded-sm bg-red-200 px-4 py-2 text-xs text-red-500"
        >
          <AlertCircle size={15} className="text-red-500" />
          {error.toString()}
        </span>
      )}
    </div>
  );
};
