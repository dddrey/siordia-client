import { IStatistics } from "@/shared/types/interfaces";
import api from "../utils/axios-instance";

class StatisticsService {
  async getStatistics(): Promise<IStatistics> {
    const response = await api.get<IStatistics>("/statistics");
    return response.data;
  }
}

export default new StatisticsService();
