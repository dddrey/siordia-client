import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { HeroSlider } from "@/shared/components/layout/main/hero-slider";
import { useFolders } from "@/shared/hooks/use-folders";
import { ContentType } from "@/shared/types/interfaces";
import withAuth from "@/shared/components/hoc/auth";
import ItemsList from "@/shared/components/items/items-list";
import Loader from "@/shared/components/ui/loader";
import { WelcomeHeader } from "@/shared/components/layout/main/welcome-header";
import { WelcomeText } from "@/shared/components/layout/main/welcome-text";
import {
  welcomeTextCoach,
  welcomeTextParent,
  welcomeTextPlayer,
} from "@/shared/utils/main-text";
import useBackButton from "@/shared/hooks/use-backbutton";

const MainScreen = () => {
  const {
    data: playerFolders,
    isLoading: isPlayerLoading,
    error: playerError,
  } = useFolders({ type: ContentType.PLAYER, enabled: true });
  const {
    data: coachFolders,
    isLoading: isCoachLoading,
    error: coachError,
  } = useFolders({ type: ContentType.COACH, enabled: false });
  const {
    data: parentFolders,
    isLoading: isParentLoading,
    error: parentError,
  } = useFolders({ type: ContentType.PARENT, enabled: false });

  useBackButton({
    isOpen: false,
  });

  const isLoading = isPlayerLoading || isCoachLoading || isParentLoading;

  return (
    <ContentWrapper className="flex flex-col gap-[3px] mb-10">
      <HeroSlider />
      {isLoading && (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader size={10} />
        </div>
      )}
      {!isLoading && (
        <>
          <WelcomeHeader
            title="Привет! Добро пожаловать в Kickstart GO!"
            className="w-full text-center"
          />
          <WelcomeText
            text={welcomeTextPlayer}
            expandButtonText={{
              expand: "Читать далее",
              collapse: "Свернуть",
            }}
          />
          <ItemsList
            isLoading={isLoading}
            isError={!!playerError}
            items={playerFolders || []}
            title="Для футболистов"
            subtitle={`${playerFolders?.length || 0} элементов`}
            href={`/folders`}
            className="w-full"
            limit={6}
            color="textPrimary"
          />
          <WelcomeText
            text={welcomeTextCoach}
            expandButtonText={{
              expand: "Читать далее",
              collapse: "Свернуть",
            }}
          />
          <ItemsList
            isLoading={isLoading}
            isError={!!coachError}
            items={coachFolders || []}
            title="Для тренеров"
            subtitle={`${coachFolders?.length || 0} элементов`}
            href={`/folders`}
            limit={6}
            className="w-full"
            color="textPrimary"
            isSoon={true}
          />
          <WelcomeText
            text={welcomeTextParent}
            expandButtonText={{
              expand: "Читать далее",
              collapse: "Свернуть",
            }}
          />
          <ItemsList
            isLoading={isLoading}
            isError={!!parentError}
            items={parentFolders || []}
            title="Для родителей"
            subtitle={`${parentFolders?.length || 0} элементов`}
            href={`/folders`}
            limit={6}
            className="w-full"
            color="textPrimary"
            isSoon={true}
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
