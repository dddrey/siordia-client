import { ContentType, ILesson } from "../types/interfaces";
import api from "../utils/axios-instance";
import { LessonFormValues } from "@/schema/lesson.schema";
import { GetLesson } from "../types/response";

class LessonsService {
  async getLessons(topicId?: string): Promise<ILesson<"preview">[]> {
    const response = await api.get(`/lessons`, {
      params: { topicId },
    });
    return response.data;
  }

  async getLesson(
    lessonId: string,
    ContentType?: ContentType
  ): Promise<GetLesson | null> {
    const response = await api.get(`/lessons/${lessonId}`, {
      params: { ContentType },
    });
    console.log(response.data);
    return response.data;
  }

  async createLesson(
    topicId: string,
    lesson: LessonFormValues
  ): Promise<ILesson<"full">> {
    const response = await api.post(`/lessons`, { ...lesson, topicId });
    return response.data;
  }

  async updateLesson(
    id: string,
    lesson: LessonFormValues
  ): Promise<ILesson<"full">> {
    const response = await api.put(`/lessons/${id}`, lesson);
    return response.data;
  }

  async deleteLesson(id: string): Promise<void> {
    await api.delete(`/lessons/${id}`);
  }
}

export const lessonsService = new LessonsService();
