import { subscriptionsService } from "../services/subscription.service";
import { ContentType } from "../types/interfaces";
import { useState } from "react";
import { useUser } from "./use-user";
export const useSubscription = () => {
  const { data: user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSubscription = async (type: ContentType) => {
    try {
      setIsLoading(true);
      const response = await subscriptionsService.getPaimenLink();
      window.Telegram.WebApp.openInvoice(response.data.paymentUrl, (status) => {
        console.log("status", status);
        if (status === "paid") {
          subscriptionsService.addSubscription(type);
        }
      });
    } catch (error) {
      console.error("Ошибка при добавлении подписки:", error);
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
    handleAddSubscription,
    isLoading,
    getActiveSubscription,
  };
};
