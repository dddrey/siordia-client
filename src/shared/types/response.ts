import { Broadcast, ILesson, ITopic, User, UserStats } from "./interfaces";

export interface GetLesson {
  lesson: ILesson<"full">;
  previousLessonId: string | null;
  nextLessonId: string | null;
}

export interface ServerError {
  type: string;
  message: string;
  statusCode: number;
  details?: number;
  href?: string;
}

export interface ApiErrorResponse {
  error: ServerError;
}

export interface GetTopic {
  topic: ITopic;
  isHavePermission: boolean;
}

export interface PaymentResponse {
  success: boolean;
  data: string;
}

export interface UsersResponse {
  all: User[];
  available: User[];
  stats: UserStats;
}

export interface GetAllBroadcastsResponse {
  broadcasts: Broadcast[];
  users: UsersResponse;
}
