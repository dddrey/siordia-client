import api from "../utils/axios-instance";
import { PaymentResponse } from "../types/response";
import { AdminGrantSubscriptionRequest } from "../types/interfaces";

class SubscriptionsService {
  async getPaimenLink(type: string): Promise<PaymentResponse> {
    const response = await api.post(`/subscriptions/payment`, { type });
    return response.data;
  }

  async grantSubscription(data: AdminGrantSubscriptionRequest): Promise<void> {
    await api.post("/subscriptions/admin-grant", data);
  }
}

export const subscriptionsService = new SubscriptionsService();
