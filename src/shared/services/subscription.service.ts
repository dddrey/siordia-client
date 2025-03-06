import { ISubscription } from "../types/interfaces";
import api from "../utils/axios-instance";

class SubscriptionsService {
  async addSubscription(type: string): Promise<ISubscription> {
    const response = await api.post(`/subscriptions`, { type });
    return response.data;
  }

  async removeAllSubscriptions(userId: string): Promise<void> {
    await api.delete(`/subscriptions/${userId}`);
  }

  async removeSubscription(subscriptionId: string): Promise<void> {
    await api.delete(`/subscriptions/${subscriptionId}`);
  }
}

export const subscriptionsService = new SubscriptionsService();
