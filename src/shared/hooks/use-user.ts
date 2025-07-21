import { toast } from "react-hot-toast";
import { userService } from "../services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const USER_QUERY_KEY = "user";

export const useUser = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => userService.getUser(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => userService.updateUser(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      toast.success("Добро пожаловать в KickStart GO!");
      await navigate("/");
    },
    onError: () => {
      toast.error("Вы не подключили бота");
    },
  });
};
