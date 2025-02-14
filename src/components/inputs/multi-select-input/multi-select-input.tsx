import React, { useState, useEffect, useCallback } from "react";
import { useDropdownPositionAdjustment } from "../../../hooks/useDropdownPositionAdjustment";
import { Input } from "../input/input";
import { Chips } from "../../chips/chips";
import { Text } from "../../texts/text";
import { Icons } from "../../../icons/index";
import { cn } from "../../../utils/cn";
import { Checkbox } from "../checkbox/checkBox";
import isEqual from "../../../utils/isEqual";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectInputProps {
  options: Option[];
  value: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  selectAllText?: string;
  showSearch?: boolean;
  showSelectAll?: boolean;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  chipClassName?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
}

const MultiSelectInput = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options",
  selectAllText = "All",
  showSearch = false,
  showSelectAll = true,
  disabled = false,
  className,
  dropdownClassName,
  chipClassName,
  error = false,
  errorMessage,
  icon = <Icons.ChevronDown />,
}: MultiSelectInputProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const [showAllChips, setShowAllChips] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { containerRef, dropdownRef, isOpen, setIsOpen, dropdownPosition } =
    useDropdownPositionAdjustment();

  const displayedChips = showAllChips
    ? selectedValues
    : selectedValues.slice(0, 3);

  // Update selectedValues only when value has changed
  useEffect(() => {
    if (!isEqual(selectedValues, value)) {
      setSelectedValues(value);
    }
  }, [value, selectedValues]);

  useEffect(() => {
    if (selectedValues.length <= 3) {
      setShowAllChips(false);
    }
  }, [selectedValues.length]);

  const handleToggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelectOption = useCallback(
    (optionValue: string) => {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange?.(newValues);
    },
    [selectedValues, onChange],
  );

  const handleRemoveTag = useCallback(
    (value: string) => {
      const newValues = selectedValues.filter((v) => v !== value);
      setSelectedValues(newValues);
      onChange?.(newValues);
    },
    [selectedValues, onChange],
  );

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectAll = useCallback(() => {
    const filteredValues = filteredOptions.map((opt) => opt.value);
    const allSelected = filteredValues.every((v) => selectedValues.includes(v));
    const newValues = allSelected
      ? selectedValues.filter((v) => !filteredValues.includes(v))
      : [...new Set([...selectedValues, ...filteredValues])];

    setSelectedValues(newValues);
    onChange?.(newValues);
  }, [filteredOptions, selectedValues, onChange]);

  const getOptionLabel = (value: string) =>
    options.find((opt) => opt.value === value)?.label ?? value;

  const handleToggleChipsVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllChips(!showAllChips);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Area */}
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "rounded-base flex flex-wrap items-center gap-2 border-2 px-4 py-3 transition-all duration-300 ease-in-out",
          error ? "border-error-500" : "border-primary-200",
          disabled ? "cursor-not-allowed bg-neutral-100" : "bg-white",
          isOpen && !error && "border-primary-500",
          className,
        )}
        onClick={handleToggleDropdown}
        onKeyDown={(e) => e.key === "Enter" && handleToggleDropdown()}
        aria-disabled={disabled}
      >
        {displayedChips.map((value) => (
          <Chips
            key={value}
            close={!disabled}
            onClose={(e) => {
              e.stopPropagation();
              handleRemoveTag(value);
            }}
            className={cn("cursor-default", chipClassName)}
          >
            {getOptionLabel(value)}
          </Chips>
        ))}

        {selectedValues.length > 3 && (
          <Chips
            className={cn(
              "bg-primary-400 cursor-pointer text-white",
              chipClassName,
            )}
            onClick={handleToggleChipsVisibility}
            close={false}
          >
            {showAllChips ? "Show less" : `+${selectedValues.length - 3} more`}
          </Chips>
        )}

        {selectedValues.length === 0 && (
          <Text variant="bodySmall" className="text-neutral-300">
            {placeholder}
          </Text>
        )}

        <div className="ml-auto flex items-center gap-2">
          {selectedValues.length > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedValues([]);
                onChange?.([]);
              }}
              className="border-primary-400 flex h-full w-full items-center justify-center border-r-2 p-2"
            >
              <Icons.X
                size={16}
                className="bg-primary-400 rounded-full text-white"
              />
            </div>
          )}
          {icon}
        </div>
      </div>

      {errorMessage && (
        <Text variant="bodySmall" className="text-error-500 mt-1">
          {errorMessage}
        </Text>
      )}

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-10 mt-2 w-full rounded-[0.8rem] border bg-white shadow-[1px_2px_8px_0px_rgba(0_0_0_0.12),-1px_0px_4px_0px_rgba(0_0_0_0.08)]",
            dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2",
            dropdownClassName,
          )}
          role="listbox"
          aria-multiselectable="true"
        >
          {/* Search Input */}
          {showSearch && (
            <div className="p-4">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {/* Select All Checkbox */}
          {showSelectAll && (
            <div
              className={cn(
                "inline-flex w-full cursor-pointer items-center gap-x-2 p-4 hover:bg-neutral-100",
                filteredOptions.every((opt) =>
                  selectedValues.includes(opt.value),
                ) && "bg-primary-100",
              )}
              onClick={handleSelectAll}
              aria-selected={filteredOptions.every((opt) =>
                selectedValues.includes(opt.value),
              )}
            >
              <Checkbox
                checked={filteredOptions.every((opt) =>
                  selectedValues.includes(opt.value),
                )}
                aria-checked={
                  filteredOptions.some((opt) =>
                    selectedValues.includes(opt.value),
                  ) &&
                  !filteredOptions.every((opt) =>
                    selectedValues.includes(opt.value),
                  )
                }
              />
              <Text variant="bodyBase">{selectAllText}</Text>
            </div>
          )}

          {/* Options List */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={selectedValues.includes(option.value)}
                >
                  <div
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2 p-4",
                      !selectedValues.includes(option.value) &&
                        "hover:bg-neutral-100",
                      selectedValues.includes(option.value) && "bg-primary-100",
                    )}
                    onClick={() => handleSelectOption(option.value)}
                  >
                    <Checkbox checked={selectedValues.includes(option.value)} />
                    <Text variant="bodyBase">{option.label}</Text>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-neutral-400">
                <Text>No options found</Text>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
