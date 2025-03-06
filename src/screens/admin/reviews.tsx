import withAdmin from "@/shared/components/hoc/admin";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";

const ReviewsScreen = () => {
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

ReviewsScreen.displayName = "ReviewsScreen";

const WrappedReviewsScreen = withAdmin(ReviewsScreen) as React.FC;
WrappedReviewsScreen.displayName = "WrappedReviewsScreen";

export default WrappedReviewsScreen;
