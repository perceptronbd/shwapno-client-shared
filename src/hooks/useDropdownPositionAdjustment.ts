import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "./useClickOutside";

export const useDropdownPositionAdjustment = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  // Close dropdown when clicking outside
  useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => {
    setIsOpen(false);
  });

  // Adjust dropdown position based on available space
  useEffect(() => {
    if (isOpen && containerRef.current && dropdownRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  return {
    containerRef,
    dropdownRef,
    isOpen,
    setIsOpen,
    dropdownPosition,
  };
};
