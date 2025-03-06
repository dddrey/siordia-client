import { ITopic } from "../types/interfaces";
import api from "../utils/axios-instance";
import { TopicFormValues } from "@/schema/topic.schema";
import { GetTopic } from "../types/response";

class TopicsService {
  async getTopics(folderId?: string): Promise<ITopic[]> {
    const response = await api.get(`/topics`, { params: { folderId } });
    return response.data;
  }

  async getTopic(topicId: string): Promise<GetTopic> {
    const response = await api.get(`/topics/${topicId}`);
    console.log(response.data);
    return response.data;
  }

  async createTopic(folderId: string, topic: TopicFormValues): Promise<ITopic> {
    const response = await api.post(`/topics`, { ...topic, folderId });
    return response.data;
  }

  async updateTopic(id: string, topic: TopicFormValues): Promise<ITopic> {
    const response = await api.put(`/topics/${id}`, topic);
    return response.data;
  }

  async deleteTopic(id: string): Promise<void> {
    await api.delete(`/topics/${id}`);
  }
}

export const topicsService = new TopicsService();
