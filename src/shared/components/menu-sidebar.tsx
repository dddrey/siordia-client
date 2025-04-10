import Sidebar from "./ui/sidebar";
import TelegramIcon from "./icons/telegram-icon";
import InstagramIcon from "./icons/instagram-icon";
import MenuLink from "./menu-link";
import MenuHistoryCard from "./menu-history-card";
import { useSidebarStore } from "../store/use-sidebar-store";

const MenuSidebar = () => {
  const { isOpen, close } = useSidebarStore();

  return (
    <Sidebar isOpen={isOpen} onClose={close}>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-center w-full mt-3">
          <p className="text-textAccent text-3xl font-bold mb-10">Mеню</p>
        </div>
        <MenuHistoryCard
          title="Сильный удар"
          subtitle="Урок 1"
          description="Футболист"
          onClose={close}
        />
        <div className="flex flex-1 flex-col items-center w-full gap-2 text-[10px] mt-4">
          <MenuLink onClick={close} text="Главная" path="/" />
          <MenuLink onClick={close} text="Подписки" path="/subscriptions" />
          <MenuLink
            onClick={close}
            text="Для футболистов"
            path="/folders?type=player"
          />
          <MenuLink
            onClick={close}
            text="Для тренеров"
            path="/folders?type=coach"
          />
          <MenuLink
            onClick={close}
            text="Для родителей"
            path="/folders?type=parent"
          />
          <MenuLink onClick={close} text="Обо мне" path="/about" />
          <MenuLink onClick={close} text="Академия в Тбилиси" path="/school" />
        </div>
        <div className="flex items-center justify-center w-full gap-2 pb-4">
          <InstagramIcon color={"#f6d061"} width={30} height={30} />
          <span className="h-[3px] w-[3px] border border-[#f6d061] rounded-md"></span>
          <TelegramIcon color={"#f6d061"} width={30} height={30} />
        </div>
      </div>
    </Sidebar>
  );
};

export default MenuSidebar;
