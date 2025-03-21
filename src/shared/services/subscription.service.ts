import { ISubscription } from "../types/interfaces";
import api from "../utils/axios-instance";
import { PaymentResponse } from "../types/response";

class SubscriptionsService {
  async addSubscription(type: string): Promise<ISubscription> {
    const response = await api.post(`/subscriptions`, { type });
    return response.data;
  }

  async getPaimenLink(): Promise<PaymentResponse> {
    const response = await api.post(`/subscriptions/payment`);
    return response.data;
  }
}

export const subscriptionsService = new SubscriptionsService();
