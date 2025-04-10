import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import useTelegram from "../hooks/use-telegram";

interface MenuLinkProps {
  text: string;
  path: string;
  onClick?: () => void;
}

const MenuLink = ({ text, path, onClick }: MenuLinkProps) => {
  const { pathname, search } = useLocation();
  const { setHapticFeedback } = useTelegram();

  const handleClick = () => {
    setHapticFeedback();
    if (onClick) {
      onClick();
    }
  };

  const isActive = (path: string) => {
    if (path.includes("?")) {
      const [basePath, queryParams] = path.split("?");
      return pathname === basePath && search === `?${queryParams}`;
    }
    return pathname === path;
  };

  return (
    <Link
      to={path}
      onClick={handleClick}
      className={cn(
        "p-3 text-[14px] w-[90%] border border-border text-textAccent rounded-lg",
        isActive(path)
          ? "border-textAccent text-textAccent"
          : "border-border/50 text-textAccent/50"
      )}
    >
      <p>{text}</p>
    </Link>
  );
};

export default MenuLink;
