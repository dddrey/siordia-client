import ItemsList from "@/shared/components/items/items-list";
import LogoImage from "@/shared/components/logo-Image";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useParams } from "react-router-dom";
import { useFolder } from "@/shared/hooks/use-folders";
import useBackButton from "@/shared/hooks/use-backbutton";

const FolderScreen = () => {
  const { id } = useParams();
  const { data: folder, isLoading, error } = useFolder(id as string);

  useBackButton({
    isOpen: true,
  });

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LogoImage
        isLoading={isLoading}
        title={folder?.name}
        type="large"
        className="mx-auto bg-primary p-3 rounded-[10px] w-[94%]"
      />
      <div className="w-[94%] mx-auto">
        <p className="text-textPrimary text-[16px] font-medium ml-1 opacity-80">
          {folder?.about || ""}
        </p>
      </div>
      <ItemsList
        items={folder?.topics || []}
        isLoading={isLoading}
        isError={!!error}
        title={`Темы папки ${folder?.name.toLowerCase()}`}
        href={`/topics`}
        params={`/?type=${folder?.type}`}
      />
    </ContentWrapper>
  );
};

export default FolderScreen;
