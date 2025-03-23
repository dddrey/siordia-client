import { subscriptionsService } from "../services/subscription.service";
import { ContentType } from "../types/interfaces";
import { useState } from "react";
import { useUser } from "./use-user";
import { toast } from "react-hot-toast";
import { useSubscriptionModal } from "../store/use-subscription-modal";

export const useSubscription = () => {
  const { data: user } = useUser();
  const { closeModal } = useSubscriptionModal();
  const [isLoading, setIsLoading] = useState(false);

  const createPaymentLink = async (type: ContentType) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await subscriptionsService.getPaimenLink(type);
      window.Telegram.WebApp.openInvoice(res.data, (status) => {
        if (status === "paid") {
          toast.success("Подписка успешно добавлена");
          closeModal();
        }
      });
    } catch (error) {
      console.error("Ошибка при добавлении подписки:", error);
      toast.error("Ошибка при подключении подписки");
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveSubscription = (type: ContentType) => {
    if (!user)
      return {
        isActive: false,
        endDate: null,
      };

    const subscription = user.subscriptions.filter(
      (sub) => sub.type === type
    )[0];

    if (!subscription)
      return {
        isActive: false,
        endDate: null,
      };

    const isActive = subscription.active;

    return {
      isActive: isActive,
      endDate: new Date(subscription.endDate).toLocaleDateString(),
    };
  };

  return {
    createPaymentLink,
    isLoading,
    getActiveSubscription,
  };
};
