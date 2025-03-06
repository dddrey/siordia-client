import SubscriptionsList from "@/shared/components/cards/subscriptions-list";
import withAuth from "@/shared/components/hoc/auth";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";

const SubscriptionScreen = () => {
  return (
    <ContentWrapper
      className="flex flex-col items-center justify-center"
      withFooter={false}
    >
      <SubscriptionsList />
    </ContentWrapper>
  );
};

SubscriptionScreen.displayName = "SubscriptionScreen";

const WrappedSubscriptionScreen = withAuth(SubscriptionScreen) as React.FC;
WrappedSubscriptionScreen.displayName = "WrappedSubscriptionScreen";

export default WrappedSubscriptionScreen;
