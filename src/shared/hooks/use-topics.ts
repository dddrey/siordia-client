import { TopicFormValues } from "@/schema/topic.schema";
import { topicsService } from "../services/topics.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const TOPICS_QUERY_KEY = "topics";

// Получение топиков
interface UseTopicsOptions {
  folderId?: string;
}

export const useTopics = (options?: UseTopicsOptions) => {
  return useQuery({
    queryKey: [TOPICS_QUERY_KEY, options?.folderId],
    queryFn: () => topicsService.getTopics(options?.folderId),
  });
};

// Получение топика по ID
export const useTopic = (id: string) => {
  return useQuery({
    queryKey: [TOPICS_QUERY_KEY, id],
    queryFn: () => topicsService.getTopic(id),
    enabled: !!id,
  });
};

// Создание топика
export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      folderId,
      data,
    }: {
      folderId: string;
      data: TopicFormValues;
    }) => topicsService.createTopic(folderId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TOPICS_QUERY_KEY],
      });
      navigate("/admin/topics");
      toast.success("Топик успешно создан");
    },
    onError: () => {
      navigate("/admin/topics");
      toast.error("Ошибка при создании топика");
    },
  });
};

// Обновление топика
export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { id: string; topic: TopicFormValues }) =>
      topicsService.updateTopic(data.id, data.topic),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({
        queryKey: [TOPICS_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [TOPICS_QUERY_KEY, id],
      });
      navigate("/admin/topics");
      toast.success("Топик обновлен");
    },
    onError: () => {
      navigate("/admin/topics");
      toast.error("Ошибка при обновлении топика");
    },
  });
};

// Удаление топика
export const useDeleteTopic = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => topicsService.deleteTopic(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TOPICS_QUERY_KEY],
      });
      navigate("/admin/topics");
      toast.success("Топик удален");
    },
    onError: () => {
      navigate("/admin/topics");
      toast.error("Ошибка при удалении топика");
    },
  });
};
