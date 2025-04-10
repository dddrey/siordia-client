import { useNavigate } from "react-router-dom";
import ItemButton from "./item-button";
import { cn } from "../../utils/cn";
import useTelegram from "@/shared/hooks/use-telegram";

interface ItemDefaultProps {
  title: string;
  id: string;
  href: string;
  type: "default";
  onClick?: (id: string) => void;
}

interface ItemPermissionProps {
  title: string;
  id: string;
  href: string;
  type: "permission";
  hasAccess: boolean;
  onClick?: (id: string) => void;
}

type ItemProps = ItemDefaultProps | ItemPermissionProps;

const Item = ({
  item,
  onClick,
  color,
}: {
  item: ItemProps;
  onClick?: (id: string) => void;
  color?: string;
}) => {
  const navigate = useNavigate();

  const { title, id, href, type } = item;
  const { setHapticFeedback } = useTelegram();

  const handleClick = () => {
    console.log(item);
    if (type === "permission" && !item.hasAccess) return;

    setHapticFeedback();

    if (onClick) {
      onClick(id);
      console.log("click 2", id);
    } else {
      navigate(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full mx-auto px-4 py-3 bg-primary shadow-card-sm-light rounded-[10px]",
        "flex items-center justify-between",
        "transition-opacity duration-200"
      )}
    >
      <p className={`text-[12px] font-medium text-${color}`}>{title}</p>
      <ItemButton
        type={type}
        color={color}
        hasAccess={item.type === "permission" ? item.hasAccess : undefined}
      />
    </div>
  );
};

export default Item;
