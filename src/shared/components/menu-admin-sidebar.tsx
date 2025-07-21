import { useAdminSidebarStore } from "../store/use-admin-sidebar-store";
import Sidebar from "./ui/sidebar";
import MenuLink from "./menu-link";

const AdminMenuSidebar = () => {
  const { isOpen, close } = useAdminSidebarStore();

  return (
    <Sidebar isOpen={isOpen} onClose={close}>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-center w-full mt-3 mb-20">
          <p className="text-textPrimary text-2xl font-bold">Админка</p>
        </div>
        <div className="flex flex-1 flex-col items-center w-full gap-2 text-[10px]">
          <MenuLink
            onClick={close}
            text="Статистика"
            path="/admin/statistics"
          />
          <MenuLink onClick={close} text="Папки" path="/admin/folders" />
          <MenuLink onClick={close} text="Темы" path="/admin/topics" />
          <MenuLink onClick={close} text="Уроки" path="/admin/lessons" />
          <MenuLink onClick={close} text="Рассылки" path="/admin/broadcasts" />
          <MenuLink onClick={close} text="Ревью" path="/admin/reviews" />
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminMenuSidebar;
