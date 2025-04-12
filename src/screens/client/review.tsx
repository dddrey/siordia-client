import ReviewForm from "@/shared/components/forms/review/review";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { ReviewFormValues } from "@/schema/review.schema";
import withAuth from "@/shared/components/hoc/auth";
import useBackButton from "@/shared/hooks/use-backbutton";

const ReviewScreen = () => {
  const onSubmit = async (data: ReviewFormValues): Promise<void> => {
    console.log(data);
  };

  useBackButton({
    isOpen: true,
  });

  return (
    <ContentWrapper className="flex flex-col justify-center">
      <div className="w-screen h-screen bg-black text-white text-2xl font-bold bg-opacity-50 absolute top-0 left-0 z-10 flex items-center justify-center">
        Скоро будет доступно!
      </div>
      <ReviewForm onSubmit={onSubmit} />
    </ContentWrapper>
  );
};

ReviewScreen.displayName = "ReviewScreen";

const WrappedReviewScreen = withAuth(ReviewScreen) as React.FC;
WrappedReviewScreen.displayName = "WrappedReviewScreen";

export default WrappedReviewScreen;
