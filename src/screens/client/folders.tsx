import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import ItemsList from "@/shared/components/items/items-list";
import { useFolders } from "@/shared/hooks/use-folders";
import { useSearchParams } from "react-router-dom";
import { ContentType } from "@/shared/types/interfaces";
import LogoImage from "@/shared/components/logo-Image";
import withAuth from "@/shared/components/hoc/auth";

const FoldersScreen = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as ContentType | null;

  const {
    data: folders,
    isLoading,
    error,
  } = useFolders({
    type: type || undefined,
  });

  const getTitle = () => {
    if (type === "player") return "Для футболистов";
    if (type === "coach") return "Для тренеров";
    if (type === "parent") return "Для родителей";
    return "Все папки"; // Заголовок по умолчанию
  };

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LogoImage
        isLoading={isLoading}
        title={getTitle()}
        type="large"
        className="mx-auto bg-primary p-3 rounded-[10px] w-[94%]"
      />
      <ItemsList
        isLoading={isLoading}
        isError={!!error}
        items={folders || []}
        title={
          type
            ? `Папки для ${type === "player" ? "футболистов" : type === "coach" ? "тренеров" : "родителей"}`
            : "Все папки"
        }
        href={`/folders`}
      />
    </ContentWrapper>
  );
};

FoldersScreen.displayName = "FoldersScreen";

const WrappedFoldersScreen = withAuth(FoldersScreen) as React.FC;
WrappedFoldersScreen.displayName = "WrappedFoldersScreen";

export default WrappedFoldersScreen;
