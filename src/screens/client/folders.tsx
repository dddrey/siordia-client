import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import ItemsList from "@/shared/components/items/items-list";
import { useFolders } from "@/shared/hooks/use-folders";
import { useSearchParams } from "react-router-dom";
import { ContentType } from "@/shared/types/interfaces";
import LogoImage from "@/shared/components/logo-Image";
import useBackButton from "@/shared/hooks/use-backbutton";

const FoldersScreen = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as ContentType | null;

  useBackButton({
    isOpen: true,
  });

  const {
    data: folders,
    isLoading,
    error,
  } = useFolders({
    type: type || undefined,
    enabled: type === "player",
  });

  const getTitle = () => {
    if (type === "player") return "Для футболистов";
    if (type === "coach") return "Для тренеров";
    if (type === "parent") return "Для родителей";
    return "Все папки"; // Заголовок по умолчанию
  };

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LogoImage isLoading={isLoading} title={getTitle()} type="large" />
      <ItemsList
        isLoading={isLoading}
        isError={!!error}
        items={folders || []}
        isSoon={type === "coach" || type === "parent"}
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

export default FoldersScreen;
