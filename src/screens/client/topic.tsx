import withAuth from "@/shared/components/hoc/auth";
import ItemsList from "@/shared/components/items/items-list";
import LogoImage from "@/shared/components/logo-Image";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import useBackButton from "@/shared/hooks/use-backbutton";
import { useTopic } from "@/shared/hooks/use-topics";
import { useParams } from "react-router-dom";

const TopicScreen = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useTopic(id as string);

  useBackButton({
    isOpen: true,
  });

  return (
    <ContentWrapper withFooter={false} className="pt-safe-area">
      <LogoImage
        isLoading={isLoading}
        title={data?.topic.name}
        type="large"
        className="mx-auto bg-primary p-3 rounded-[10px] w-[94%] mt-5"
      />
      <div className="w-[94%] mx-auto">
        <p className="text-textPrimary text-[16px] font-medium ml-1 opacity-80">
          {data?.topic.about || ""}
        </p>
      </div>
      <ItemsList
        items={data?.topic.lessons || []}
        isLoading={isLoading}
        isError={!!error}
        title={`Уроки темы ${data?.topic.name.toLowerCase()}`}
        href={`/lesson`}
        hasAccess={data?.isHavePermission}
        type="permission"
        params={`/?type=${data?.topic.type}`}
      />
    </ContentWrapper>
  );
};

TopicScreen.displayName = "TopicScreen";

const WrappedTopicScreen = withAuth(TopicScreen) as React.FC;
WrappedTopicScreen.displayName = "WrappedTopicScreen";

export default WrappedTopicScreen;
