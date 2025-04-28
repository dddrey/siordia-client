import { subscriptionsService } from "../services/subscription.service";
import { ContentType } from "../types/interfaces";
import { useState } from "react";
import { useUser } from "./use-user";
import { toast } from "react-hot-toast";
import { useSubscriptionModal } from "../store/use-subscription-modal";
import { useQueryClient } from "@tanstack/react-query";
import { FOLDERS_QUERY_KEY } from "./use-folders";
import { LESSONS_QUERY_KEY } from "./use-lessons";
import { TOPICS_QUERY_KEY } from "./use-topics";

export const useSubscription = () => {
  const { data: user, refetch } = useUser();
  const queryClient = useQueryClient();
  const { closeModal } = useSubscriptionModal();
  const [isLoading, setIsLoading] = useState(false);

  const createPaymentLink = async (type: ContentType) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await subscriptionsService.getPaimenLink(type);
      window.Telegram.WebApp.openInvoice(res.data, async (status) => {
        if (status === "paid") {
          toast.success("Подписка успешно добавлена");
          closeModal();
          refetch();
          await queryClient.invalidateQueries({
            queryKey: [TOPICS_QUERY_KEY],
          });
          await queryClient.invalidateQueries({
            queryKey: [LESSONS_QUERY_KEY],
          });
          await queryClient.invalidateQueries({
            queryKey: [FOLDERS_QUERY_KEY],
          });
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
