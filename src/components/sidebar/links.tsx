"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "src/utils/cn";

interface SidebarLinkProps {
  name: string;
  href: string;
  currentPath: string;
  Icon?: LucideIcon;
  onClose?: () => void;
  LinkComponent : React.FC<{ href: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;}>
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  href,
  Icon,
  currentPath,
  onClose,
    LinkComponent,
}) => {


  return (
    <LinkComponent
      onClick={onClose}
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 text-lg transition",
        currentPath === href
          ? "bg-white font-medium text-black"
          : "hover:bg-gray-800",
      )}
    >
      {Icon && <Icon size={20} />}
      {name}
    </LinkComponent>
  );
};