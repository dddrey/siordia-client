import ItemsList from "@/shared/components/items/items-list";
import LogoImage from "@/shared/components/logo-Image";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import useBackButton from "@/shared/hooks/use-backbutton";
import useTelegram from "@/shared/hooks/use-telegram";
import { useTopics } from "@/shared/hooks/use-topics";
import { FolderIcon, PlusIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const TopicsScreen = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("folderId");
  const { setHapticFeedback } = useTelegram();

  useBackButton({
    isOpen: true,
  });

  const {
    data: topics,
    isLoading,
    error,
  } = useTopics({ folderId: id as string });

  return (
    <ContentWrapper className="pt-safe-area" withFooter={false}>
      <LogoImage
        type="large"
        className="mx-auto bg-primary p-3 rounded-[10px] w-[94%]"
      />
      <div className="flex items-center justify-between w-[94%] mx-auto mt-5 bg-primary shadow-card-sm-light p-2 rounded-[10px]">
        <Link
          to={`/admin/folders`}
          onClick={setHapticFeedback}
          className="bg-primary p-2 rounded-[10px] border border-border "
        >
          <FolderIcon className="w-4 h-4 text-textAccent" />
        </Link>
        <Link
          to="/admin/topic/create"
          onClick={setHapticFeedback}
          className="bg-primary p-2 rounded-[10px] border border-border"
        >
          <PlusIcon className="w-4 h-4 text-textAccent" />
        </Link>
      </div>
      <ItemsList
        isLoading={isLoading}
        isError={!!error}
        items={topics || []}
        title={`Темы`}
        subtitle={`${topics?.length} тем`}
        href={`/admin/topic`}
      />
    </ContentWrapper>
  );
};

export default TopicsScreen;
