import * as React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { cn } from "../../../utils/cn";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../input/input";
import { Radio } from "../radio/radio";

interface FilterableDropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FilterableDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: FilterableDropdownOption[];
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultText?: string;
}

export const FilterableDropdown = <T extends FieldValues>({
  name,
  control,
  options,
  label,
  placeholder = "Select or type to filter...",
  className,
  disabled = false,
  defaultText,
}: FilterableDropdownProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState(defaultText ?? "");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // Filter options based on input text
  const filteredOptions = React.useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(filterText.toLowerCase()),
      ),
    [options, filterText],
  );

  // Get the selected option's label
  // const selectedLabel = React.useMemo(() => {
  //   const selectedOption = options.find(
  //     (option) => option.value === field.value,
  //   );
  //   return selectedOption ? selectedOption.label : "";
  // }, [field.value, options]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // Handle radio selection
  const handleRadioChange = (value: string) => {
    field.onChange(value);
    const selectedOption = options.find((option) => option.value === value);
    setFilterText(selectedOption ? selectedOption.label : "");
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div className={cn("relative w-full", className)} ref={dropdownRef}>
        {label && (
          <label className="text-primary-400 mb-2 block text-sm font-medium">
            {label}
          </label>
        )}

        <div className="rounded-base relative border border-neutral-200">
          <Input
            value={filterText}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "pr-10",
              error && "border-red-500",
              disabled && "cursor-not-allowed opacity-70",
            )}
          />

          <button
            type="button"
            onClick={toggleDropdown}
            disabled={disabled}
            className={cn(
              "absolute inset-y-0 right-0 flex items-center pr-3",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
            aria-label={isOpen ? "Close options" : "Show options"}
            tabIndex={-1}
          >
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        {isOpen && (
          <div
            className="border-primary-100 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg"
            role="listbox"
            aria-label={`Options for ${label ?? name}`}
          >
            {filteredOptions.length > 0 ? (
              <Radio
                name={name}
                options={filteredOptions}
                value={field.value}
                onValueChange={handleRadioChange}
                className="p-2"
              />
            ) : (
              <div className="p-4 text-sm text-gray-500">
                No options match your search
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <span
          role="alert"
          className="mt-2 flex w-full items-center gap-2 rounded-sm bg-red-200 px-4 py-2 text-xs text-red-500"
        >
          <AlertCircle size={15} className="text-red-500" />
          {error.message}
        </span>
      )}
    </>
  );
};

FilterableDropdown.displayName = "FilterableDropdown";
