import { BroadcastFormValues } from "@/schema/broadcast.shema";
import { Broadcast } from "../types/interfaces";
import { GetAllBroadcastsResponse } from "../types/response";
import api from "../utils/axios-instance";

class BroadcastService {
  async createBroadcast(data: BroadcastFormValues): Promise<Broadcast> {
    console.log(data);
    const response = await api.post(`/broadcast`, data);

    return response.data;
  }

  async testBroadcast(data: BroadcastFormValues): Promise<Broadcast> {
    const response = await api.post(`/broadcast/test`, data);

    return response.data;
  }

  async getBroadcast(id: string): Promise<Broadcast> {
    console.log(id);
    const response = await api.get(`/broadcast/${id}`);
    return response.data;
  }

  async getBroadcastList(): Promise<GetAllBroadcastsResponse> {
    const response = await api.get(`/broadcast`);
    console.log(response.data);
    return response.data;
  }

  async startBroadcast(id: string): Promise<Broadcast> {
    const response = await api.post(`/broadcast/${id}/start`);
    return response.data;
  }
}

export const broadcastService = new BroadcastService();
