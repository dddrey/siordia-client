import { lessonsService } from "../services/lesson.service";
import { ContentType } from "../types/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const LESSONS_QUERY_KEY = "lessons";

// Получение уроков
interface UseLessonsOptions {
  topicId?: string;
}

export const useLessons = (options?: UseLessonsOptions) => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY, options?.topicId],
    queryFn: () => lessonsService.getLessons(options?.topicId),
  });
};

export const useLesson = (id: string, type?: ContentType) => {
  return useQuery({
    queryKey: [LESSONS_QUERY_KEY, id],
    queryFn: () => lessonsService.getLesson(id, type),
    enabled: !!id,
  });
};

// Создание урока
export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => lessonsService.createLesson(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY],
      });
      navigate("/admin/lessons");
      toast.success("Урок создан");
    },
    onError: () => {
      navigate("/admin/lessons");
      toast.error("Ошибка при создании урока");
    },
  });
};

// Обновление урока
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { id: string; lesson: FormData }) =>
      lessonsService.updateLesson(data.id, data.lesson),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY, id],
      });
      navigate("/admin/lessons");
      toast.success("Урок обновлен");
    },
    onError: () => {
      navigate("/admin/lessons");
      toast.error("Ошибка при обновлении урока");
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => lessonsService.deleteLesson(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY],
      });
      navigate("/admin/lessons");
      toast.success("Урок удален");
    },
    onError: () => {
      navigate("/admin/lessons");
      toast.error("Ошибка при удалении урока");
    },
  });
};
