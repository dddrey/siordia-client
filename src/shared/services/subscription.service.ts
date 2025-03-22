import api from "../utils/axios-instance";
import { PaymentResponse } from "../types/response";

class SubscriptionsService {
  async getPaimenLink(type: string): Promise<PaymentResponse> {
    const response = await api.post(`/subscriptions/payment`, { type });
    return response.data;
  }
}

export const subscriptionsService = new SubscriptionsService();
