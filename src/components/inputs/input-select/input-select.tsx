"use client";

import React, { useState } from "react";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../input/input";
import { Radio } from "../radio/radio";
import { cn } from "../../../utils/cn";

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface InputSelectProps {
  categories: Category[];
  placeholder?: string;
  error?: string;
}

export const InputSelect = ({
  categories,
  placeholder,
  error,
  ...props
}: InputSelectProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const transformedCategories = filteredCategories.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="w-full">
      {/* Dropdown Input */}
      <div
        className={cn(
          "relative flex items-center justify-between rounded-lg border bg-white px-4",
          dropdownOpen ? "border-red-500" : "border-gray-300",
        )}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <Input
          type="text"
          placeholder={placeholder}
          {...props}
          className="w-full border-none outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
        />
        {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Dropdown List */}
      {dropdownOpen && (
        <div className="mt-2 rounded-lg border bg-white p-2 shadow-md">
          {transformedCategories.length > 0 ? (
            <Radio
              options={transformedCategories}
              name="product"
              value={selectedProduct ?? ""}
              onValueChange={(val) => {
                setSelectedProduct(val);
                setSearchQuery(
                  filteredCategories.find((p) => p.id === val)?.name ?? "",
                );
                setDropdownOpen(false);
              }}
            />
          ) : (
            <p className="p-2 text-sm text-gray-500">No product found</p>
          )}
        </div>
      )}
      {error && (
        <span
          role="alert"
          className="mt-2 flex w-full items-center gap-2 rounded-sm bg-red-200 px-4 py-2 text-xs text-red-500"
        >
          <AlertCircle size={15} className="text-red-500" />
          {error}
        </span>
      )}
    </div>
  );
};
