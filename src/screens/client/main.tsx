import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import CardsSlider from "@/shared/components/cards/cards-slider";
import { HeroSlider } from "@/shared/components/layout/main/hero-slider";
import { useFolders } from "@/shared/hooks/use-folders";
import { ContentType } from "@/shared/types/interfaces";
import withAuth from "@/shared/components/hoc/auth";

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
      <CardsSlider
        items={playerFolders || []}
        title="Для футболистов"
        icon="🥇"
        isLoading={isLoading}
        isError={!!playerError}
      />
      <CardsSlider
        items={coachFolders || []}
        title="Для тренеров"
        icon="🧑‍🏫"
        isLoading={isLoading}
        isError={!!coachError}
      />
      <CardsSlider
        items={parentFolders || []}
        title="Для родителей"
        icon="👩🏻‍🍼"
        isLoading={isLoading}
        isError={!!parentError}
      />
    </ContentWrapper>
  );
};

MainScreen.displayName = "MainScreen";

const WrappedMainScreen = withAuth(MainScreen) as React.FC;
WrappedMainScreen.displayName = "WrappedMainScreen";

export default WrappedMainScreen;
