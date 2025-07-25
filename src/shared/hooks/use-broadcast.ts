import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { broadcastService } from "../services/broadcast.service";
import { toast } from "react-hot-toast";
import { Broadcast } from "../types/interfaces";
import { GetAllBroadcastsResponse } from "../types/response";
import { BroadcastFormValues } from "@/schema/broadcast.shema";
import { useNavigate } from "react-router-dom";

export const useGetBroadcast = (id: string) => {
  return useQuery<Broadcast>({
    queryKey: ["broadcast", id],
    queryFn: () => broadcastService.getBroadcast(id),
  });
};

export const useGetBroadcastList = () => {
  return useQuery<GetAllBroadcastsResponse>({
    queryKey: ["broadcastList"],
    queryFn: () => broadcastService.getBroadcastList(),
  });
};

export const useStartBroadcast = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<Broadcast, Error, string>({
    mutationFn: (id: string) => broadcastService.startBroadcast(id),
    onSuccess: (_, id) => {
      navigate(`/admin/broadcasts`);
      queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
      queryClient.invalidateQueries({ queryKey: ["broadcast", id] });
      toast.success("Рассылка успешно запущена");
    },
    onError: () => {
      toast.error("Произошла ошибка при запуске рассылки");
    },
  });
};

export const useCreateBroadcast = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<Broadcast, Error, BroadcastFormValues>({
    mutationFn: (data: BroadcastFormValues) =>
      broadcastService.createBroadcast(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
      navigate(`/admin/broadcasts`);
      toast.success("Рассылка успешно создана");
    },

    onError: () => {
      toast.error("Произошла ошибка при создании рассылки");
    },
  });
};

export const useDeleteBroadcast = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<Broadcast, Error, string>({
    mutationFn: (id: string) => broadcastService.deleteBroadcast(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
      queryClient.invalidateQueries({ queryKey: ["broadcast", id] });
      toast.success("Рассылка успешно удалена");
      navigate(`/admin/broadcasts`);
    },
    onError: () => {
      toast.error("Произошла ошибка при удалении рассылки");
    },
  });
};

export const useUpdateBroadcast = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    Broadcast,
    Error,
    { id: string; data: BroadcastFormValues }
  >({
    mutationFn: ({ id, data }) => broadcastService.updateBroadcast(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["broadcastList"] });
      queryClient.invalidateQueries({ queryKey: ["broadcast", id] });
      toast.success("Рассылка успешно обновлена");
      navigate(`/admin/broadcasts`);
    },
    onError: () => {
      toast.error("Произошла ошибка при обновлении рассылки");
    },
  });
};

export const useTestBroadcast = () => {
  return useMutation<Broadcast, Error, BroadcastFormValues>({
    mutationFn: (data: BroadcastFormValues) =>
      broadcastService.testBroadcast(data),
    onSuccess: () => {
      toast.success("Тестовая рассылка успешно отправлена");
    },
    onError: () => {
      toast.error("Произошла ошибка при отправке тестовой рассылки");
    },
  });
};
