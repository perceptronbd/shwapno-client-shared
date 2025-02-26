"use client";

import { Text } from "@shared-components/texts/text";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../../utils/cn";

interface ImageInputProps {
  name: string;
  required?: boolean;
  className?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  name,
  required,
  className,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(name, file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input
        id={name}
        accept="image/*"
        type="file"
        {...register(name, { required })}
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
      {errors[name] && (
        <span className="text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ImageInput;
