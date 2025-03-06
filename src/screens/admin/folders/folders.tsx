import withAdmin from "@/shared/components/hoc/admin";
import ItemsList from "@/shared/components/items/items-list";
import LogoImage from "@/shared/components/logo-Image";
import TypeFilter from "@/shared/components/ui/type-filter";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useFolders } from "@/shared/hooks/use-folders";
import useTelegram from "@/shared/hooks/use-telegram";
import { ContentType } from "@/shared/types/interfaces";
import { PlusIcon } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const FoldersScreen = () => {
  const [searchParams] = useSearchParams();
  const { setHapticFeedback } = useTelegram();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const type = searchParams.get("type") as ContentType | null;

  const {
    data: folders,
    isLoading,
    error,
  } = useFolders({
    type: type || undefined,
  });

  const handleTypeChange = (newType: ContentType | null) => {
    const params = new URLSearchParams(searchParams);
    if (newType) {
      params.set("type", newType);
    } else {
      params.delete("type");
    }
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LogoImage type="large" className="mx-auto rounded-[10px] w-[94%]" />
      <div className="flex items-center justify-between w-[94%] mx-auto mt-5 bg-primary text-textPrimary shadow-card-light p-2 rounded-[10px]">
        <TypeFilter selectedType={type} onChange={handleTypeChange} />
        <Link
          to="/admin/folder/create"
          className="bg-primary border border-border p-2 rounded-[10px]"
          onClick={setHapticFeedback}
        >
          <PlusIcon className="w-4 h-4 text-gray-400" />
        </Link>
      </div>
      <ItemsList
        isLoading={isLoading}
        isError={!!error}
        items={folders || []}
        title={
          type
            ? `Папки для ${type === "player" ? "футболистов" : type === "coach" ? "тренеров" : "родителей"}`
            : "Все папки"
        }
        subtitle={`${folders?.length} папок`}
        href={`/admin/folder`}
      />
    </ContentWrapper>
  );
};

FoldersScreen.displayName = "FoldersScreen";

const WrappedFoldersScreen = withAdmin(FoldersScreen) as React.FC;
WrappedFoldersScreen.displayName = "WrappedFoldersScreen";

export default WrappedFoldersScreen;
