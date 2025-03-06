import { userService } from "../services/user.service";
import { useQuery } from "@tanstack/react-query";

export const USER_QUERY_KEY = "user";

export const useUser = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => userService.getUser(),
    staleTime: 5 * 60 * 1000, // Кэшируем на 5 минут
    retry: 1, // Пробуем повторить запрос только 1 раз
  });
};
