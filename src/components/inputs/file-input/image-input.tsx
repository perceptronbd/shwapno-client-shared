"use client";

import { Text } from "../../texts/text";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "../../../utils/cn";
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
  name: string;
  error?: ErrorType;
  className?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  name,
  error,
  className,
  ...props
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input
        id={name}
        accept="image/*"
        type="file"
        {...props}
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className={cn(
          "xl:h-46 flex h-32 w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-400 bg-neutral-200 p-4 text-base text-neutral-600 hover:cursor-pointer sm:h-80",
          className,
        )}
      >
        {preview ? (
          <section className="flex flex-col items-center">
            <Image
              height={100}
              width={100}
              src={preview}
              alt="Preview"
              className="w-1/3 rounded-lg border xl:w-1/5"
            />
          </section>
        ) : (
          <>
            <ImagePlus size={48} color="#A3A3A3" />
            <Text className="mb-2 mt-2">Click or Drag and drop images</Text>
            <Text>PNG. Max size 5MB or 1000px</Text>
          </>
        )}
      </label>
      {error && (
        <Text className="text-xs text-red-500">{error.toString()}</Text>
      )}
    </div>
  );
};
