import { Eye, Settings, Video } from "lucide-react";
import { ListTodo } from "lucide-react";
import { useSidebarStore } from "@/shared/store/use-sidebar-store";
import { useAdminSidebarStore } from "@/shared/store/use-admin-sidebar-store";

type FormView = "settings" | "tasks" | "video";

interface LessonButtonsProps {
  view: FormView;
  handleViewChange: (view: FormView) => void;
  handlePreviewClick: () => void;
}

export const LessonButtons = ({
  view,
  handleViewChange,
  handlePreviewClick,
}: LessonButtonsProps) => {
  const { isOpen } = useSidebarStore();
  const { isOpen: isOpenAdmin } = useAdminSidebarStore();

  return (
    <div
      className={`flex items-center justify-center fixed gap-2 ${isOpen || isOpenAdmin ? " visible" : "z-[100]"} top-safe-area left-1/2 -translate-x-1/2 w-fit`}
    >
      <button
        type="button"
        onClick={() => handleViewChange("settings")}
        className={`p-3 rounded-md transition shadow-card-sm-light ${
          view === "settings"
            ? "bg-blue-500 text-white"
            : "text-gray-400 border border-border"
        }`}
      >
        <Settings size={20} />
      </button>
      <button
        type="button"
        onClick={() => handleViewChange("tasks")}
        className={`p-3 rounded-md transition shadow-card-sm-light ${
          view === "tasks"
            ? "bg-blue-500 text-white"
            : "text-gray-400 border border-border"
        }`}
      >
        <ListTodo size={20} />
      </button>
      <button
        type="button"
        onClick={() => handleViewChange("video")}
        className={`p-3 rounded-md transition shadow-card-sm-light ${
          view === "video"
            ? "bg-blue-500 text-white"
            : "text-gray-400 border border-border"
        }`}
      >
        <Video size={20} />
      </button>
      <button
        type="button"
        onClick={handlePreviewClick}
        className="p-3 rounded-md transition shadow-card-sm-light text-gray-400 border border-border"
      >
        <Eye size={20} />
      </button>
    </div>
  );
};
