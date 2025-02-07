"use client";

import { RefObject, useEffect, useRef } from "react";
export const useClickOutside = (
  elRef: RefObject<HTMLElement>,
  cb: () => void
) => {
  const cbRef = useRef<() => void | null>(null);
  cbRef.current = cb;
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isOutSide =
        elRef?.current &&
        !elRef.current.contains(e.target as HTMLElement) &&
        cbRef?.current;
      if (isOutSide && cbRef?.current) {
        cbRef?.current();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cbRef?.current?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [cbRef, elRef]);
};
