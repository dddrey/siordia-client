import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import useBackButton from "@/shared/hooks/use-backbutton";
const ReviewsScreen = () => {
  useBackButton({
    isOpen: true,
  });

  return (
    <ContentWrapper
      className="flex justify-center items-center"
      withFooter={false}
    >
      <div className="text-2xl font-bold text-center text-blue-500">
        тут будет ревью после mvp
      </div>
    </ContentWrapper>
  );
};

export default ReviewsScreen;
