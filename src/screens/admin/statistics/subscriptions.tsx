import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import useBackButton from "@/shared/hooks/use-backbutton";
import AdminSubscriptionForm from "@/shared/components/forms/admin-subscription/admin-subscription";
import type { AdminSubscriptionFormValues } from "@/schema/admin-subscription.schema";
import { useGrantSubscription } from "@/shared/hooks/use-subscription";

const SubscriptionsScreen = () => {
  const grantSubscription = useGrantSubscription();

  useBackButton({
    isOpen: true,
  });

  const handleGrantSubscription = async (data: AdminSubscriptionFormValues) => {
    await grantSubscription.mutateAsync(data);
  };

  return (
    <ContentWrapper className="pt-safe-area" withFooter={false}>
      <section className="flex flex-col gap-4 mx-auto w-[94%] text-textPrimary">
        <h1 className="text-2xl font-bold">Выдать подписку</h1>

        {/* Форма выдачи подписки */}
        <AdminSubscriptionForm
          onSubmit={handleGrantSubscription}
          isLoading={grantSubscription.isPending}
        />
      </section>
    </ContentWrapper>
  );
};

export default SubscriptionsScreen;
