import { cn } from "../../utils/cn";

interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
}

const Sidebar = ({
  children,
  isOpen,
  onClose,
  position = "right",
}: SidebarProps) => {
  return (
    <section
      onClick={onClose}
      className={cn(
        "fixed top-0 left-0 z-50 w-full h-full transition-all duration-200 backdrop-blur-md",
        isOpen ? "bg-black/40 visible" : "bg-black/0 invisible"
      )}
    >
      <div
        className={cn(
          "absolute top-0 h-full w-[300px] bg-primary transition-transform duration-300 pt-safe-area pb-4",
          position === "right" ? "right-0" : "left-0",
          isOpen
            ? "translate-x-0"
            : position === "right"
              ? "translate-x-full"
              : "-translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default Sidebar;
