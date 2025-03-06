import { useQuery } from "@tanstack/react-query";
import statisticsService from "../services/statistics.service";

export const STATISTICS_QUERY_KEY = "statistics";

export const useStatistics = () => {
  return useQuery({
    queryKey: [STATISTICS_QUERY_KEY],
    queryFn: () => statisticsService.getStatistics(),
  });
};
