import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { HeroSlider } from "@/shared/components/layout/main/hero-slider";
import { useFolders } from "@/shared/hooks/use-folders";
import { ContentType } from "@/shared/types/interfaces";
import withAuth from "@/shared/components/hoc/auth";
import ItemsList from "@/shared/components/items/items-list";
import Loader from "@/shared/components/ui/loader";

const MainScreen = () => {
  const {
    data: playerFolders,
    isLoading: isPlayerLoading,
    error: playerError,
  } = useFolders({ type: ContentType.PLAYER });
  const {
    data: coachFolders,
    isLoading: isCoachLoading,
    error: coachError,
  } = useFolders({ type: ContentType.COACH });
  const {
    data: parentFolders,
    isLoading: isParentLoading,
    error: parentError,
  } = useFolders({ type: ContentType.PARENT });

  const isLoading = isPlayerLoading || isCoachLoading || isParentLoading;

  return (
    <ContentWrapper className="flex flex-col gap-[10px] mb-10">
      <HeroSlider />
      {isLoading && (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader size={10} />
        </div>
      )}
      {!isLoading && (
        <>
          <ItemsList
            isLoading={isLoading}
            isError={!!playerError}
            items={playerFolders || []}
            title="Для футболистов"
            subtitle={`${playerFolders?.length} элементов`}
            href={`/folders`}
            limit={6}
          />
          <ItemsList
            isLoading={isLoading}
            isError={!!coachError}
            items={coachFolders || []}
            title="Для тренеров"
            subtitle={`${coachFolders?.length} элементов`}
            href={`/folders`}
            limit={6}
          />
          <ItemsList
            isLoading={isLoading}
            isError={!!parentError}
            items={parentFolders || []}
            title="Для родителей"
            subtitle={`${parentFolders?.length} элементов`}
            href={`/folders`}
            limit={6}
          />
        </>
      )}
    </ContentWrapper>
  );
};

MainScreen.displayName = "MainScreen";

const WrappedMainScreen = withAuth(MainScreen) as React.FC;
WrappedMainScreen.displayName = "WrappedMainScreen";

export default WrappedMainScreen;
