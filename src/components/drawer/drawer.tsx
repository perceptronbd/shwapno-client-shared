"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "../buttons/button";
import { Icons } from "../../icons/index";
import { cn } from "../../utils/cn";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  isCrossVisible?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  isCrossVisible = true,
  orientation = "vertical",
  className,
}: DrawerProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle focus trapping when the drawer opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isHorizontal = orientation === "horizontal";

  const translateClass = {
    horizontal: isOpen ? "translate-x-0" : "-translate-x-full",
    vertical: isOpen ? "translate-y-0" : "translate-y-full",
  }[orientation];
  

  return (
    <div
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-[70] flex  bg-black/85 text-white transition-opacity duration-300",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        isHorizontal ? "items-center justify-start" : "items-end justify-center"
      )}
    >
      <div
        className={cn(
          "relative bg-neutral-50 shadow-lg transition-transform duration-300",
          isHorizontal ? "h-full w-full p-6" : "h-full w-full px-8 py-6 rounded-t-xl",
          translateClass, className // Using the cleaned-up logic
        )}
      >
        {isCrossVisible && (
          <Button
            onClick={onClose}
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-neutral-100 p-0 text-neutral-400 hover:bg-neutral-300"
            aria-label="Close Drawer"
          >
            <Icons.X size={22} />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};
