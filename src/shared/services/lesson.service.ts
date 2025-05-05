import { ContentType, ILesson } from "../types/interfaces";
import api from "../utils/axios-instance";
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
    const tasks = response.data.lesson.tasks.map((task: any) =>
      JSON.parse(task)
    );
    return {
      ...response.data,
      lesson: {
        ...response.data.lesson,
        tasks,
      },
    };
  }

  async createLesson(formData: FormData): Promise<ILesson<"full">> {
    const response = await api.post(`/lessons`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  }

  async updateLesson(id: string, lesson: FormData): Promise<ILesson<"full">> {
    const response = await api.put(`/lessons/${id}`, lesson);
    return response.data;
  }

  async deleteLesson(id: string): Promise<void> {
    await api.delete(`/lessons/${id}`);
  }

  async getVideoUrl(id: string): Promise<{ videoUrl: string }> {
    const response = await api.get(`/lessons/${id}/video-url`);
    return response.data;
  }
}

export const lessonsService = new LessonsService();
