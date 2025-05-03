import { FolderIcon, PlusIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useLessons } from "@/shared/hooks/use-lessons";
import LogoImage from "@/shared/components/logo-Image";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import ItemsList from "@/shared/components/items/items-list";
import useTelegram from "@/shared/hooks/use-telegram";
import withAdmin from "@/shared/components/hoc/admin";
import useBackButton from "@/shared/hooks/use-backbutton";

const LessonsScreen = () => {
  const [searchParams] = useSearchParams();
  const { setHapticFeedback } = useTelegram();
  useBackButton({
    isOpen: true,
  });
  const {
    data: lessons,
    isLoading,
    error,
  } = useLessons({ topicId: searchParams.get("topicId") as string });

  const onClick = () => {
    setHapticFeedback();
  };

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LogoImage
        type="large"
        className="mx-auto bg-primary p-3 rounded-[10px] w-[94%]"
      />
      <div className="flex items-center justify-between w-[94%] mx-auto mt-5 bg-primary shadow-card-sm-light p-2 rounded-[10px]">
        <Link
          to={`/admin/folders`}
          onClick={setHapticFeedback}
          className="bg-primary p-2 rounded-[10px] border border-border"
        >
          <FolderIcon className="w-4 h-4 text-textAccent" />
        </Link>
        <Link
          to="/admin/lesson/create"
          onClick={onClick}
          className="bg-primary p-2 rounded-[10px] border border-border"
        >
          <PlusIcon className="w-4 h-4 text-textAccent" />
        </Link>
      </div>
      <ItemsList
        isLoading={isLoading}
        isError={!!error}
        items={lessons || []}
        title={`Уроки`}
        subtitle={`${lessons?.length} уроков`}
        href={`/admin/lesson`}
      />
    </ContentWrapper>
  );
};

LessonsScreen.displayName = "LessonsScreen";

const WrappedLessonsScreen = withAdmin(LessonsScreen) as React.FC;
WrappedLessonsScreen.displayName = "WrappedLessonsScreen";

export default WrappedLessonsScreen;
