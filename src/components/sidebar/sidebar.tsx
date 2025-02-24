import { Drawer } from "../drawer/drawer";
import { SidebarLink } from "./links";

interface NavLinks {
  topLinks: {
    name: string;
    href: string;
    Icon: React.ComponentType<{ size: number }>;
  }[];
  bottomLinks: {
    name: string;
    href: string;
    Icon: React.ComponentType<{ size: number }>;
  }[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  NavLinks: NavLinks;
  currentPath: string;
  LinkComponent: React.FC<{
    href: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }>;
  Logo: React.ReactNode;
  direction?: "left" | "right";
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  NavLinks,
  currentPath,
  LinkComponent,
  Logo,
  direction,
}) => {
  return (
    <Drawer
      className="bg-primary-400 w-full"
      buttonClassName="bg-transparent text-white hover:text-secondary-500 h-6 w-6"
      isOpen={isOpen}
      onClose={onClose}
      orientation="horizontal"
      direction={direction}
    >
      <aside className="bg-primary-400 flex min-h-screen w-full flex-col px-4 py-12 text-white">
        {/* Logo */}
        <div className="mb-6 flex w-full justify-start">{Logo}</div>

        {/* Navigation Links */}
        <nav className="flex flex-1 flex-col gap-2">
          {NavLinks.topLinks.map((link) => (
            <SidebarLink
              onClose={onClose}
              key={link.name}
              {...link}
              LinkComponent={LinkComponent}
              currentPath={currentPath}
            />
          ))}
        </nav>

        {/* Bottom Links */}
        <nav className="mt-auto flex flex-col gap-2 pt-4">
          {NavLinks.bottomLinks.map((link) => (
            <SidebarLink
              onClose={onClose}
              key={link.name}
              {...link}
              LinkComponent={LinkComponent}
              currentPath={currentPath}
            />
          ))}
        </nav>
      </aside>
    </Drawer>
  );
};
