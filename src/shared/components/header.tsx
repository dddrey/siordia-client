import { AlignJustify, FileSliders } from "lucide-react";
import { useSidebarStore } from "../store/use-sidebar-store";
import { useAdminSidebarStore } from "../store/use-admin-sidebar-store";
import { useUser } from "../hooks/use-user";
import HistoryCard from "./history-card";
import useTelegram from "../hooks/use-telegram";

const Header = () => {
  const { open } = useSidebarStore();
  const { setHapticFeedback } = useTelegram();
  const { open: openAdminSidebar } = useAdminSidebarStore();
  const { data: user } = useUser();

  const handleOpenSidebar = () => {
    setHapticFeedback();
    if (open) {
      open();
    }
  };

  const handleOpenAdminSidebar = () => {
    setHapticFeedback();
    if (openAdminSidebar) {
      openAdminSidebar();
    }
  };

  return (
    <header className="fixed bottom-[40px] right-3 w-full h-fit bg-opacity-0 bg-black z-[15] pointer-events-auto">
      <div className="flex justify-between w-full h-full p-2 max-w-[500px] mx-auto items-center">
        <div className="flex items-center gap-2 w-[90%] pr-2">
          <HistoryCard />
        </div>
        <div className="flex gap-1">
          <div
            className="flex items-center justify-center p-[14px] bg-primary shadow-card-light rounded-[16px] cursor-pointer"
            onClick={handleOpenSidebar}
          >
            <AlignJustify
              className="text-textPrimary"
              size={20}
              strokeWidth={1.75}
            />
          </div>
          {user?.isAdmin && (
            <div
              className="flex items-center justify-center p-[14px] bg-primary shadow-card-light rounded-[16px] cursor-pointer"
              onClick={handleOpenAdminSidebar}
            >
              <FileSliders
                className="text-textPrimary"
                size={20}
                strokeWidth={1.75}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
