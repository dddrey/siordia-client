export enum ContentType {
  PLAYER = "player",
  COACH = "coach",
  PARENT = "parent",
}

export const ContentTypeLabels: Record<ContentType, string> = {
  [ContentType.PLAYER]: "Игроки",
  [ContentType.COACH]: "Тренеры",
  [ContentType.PARENT]: "Родители",
};

export interface IFolder {
  id: string;
  name: string;
  about: string;
  description: string;
  topics: ITopic[];
  type: ContentType;
}

export interface ITopic {
  id: string;
  name: string;
  image: string;
  about: string;
  description: string;
  lessons: ILesson<"preview">[];
  progress: number;
  type: ContentType;
}

export interface ILesson<T extends "preview" | "full"> {
  id: string;
  name: string;
  orderNumber: number;
  isCompleted: boolean;
  videoId: T extends "full" ? string : never;
  about: T extends "full" ? string : never;
  description: T extends "full" ? string : never;
  tasks: T extends "full" ? ITask[] : never;
  views: T extends "full" ? number : never;
  isSubscriptionRequired: T extends "full" ? boolean : never;
  topicId: T extends "full" ? string : never;
}

export interface ITask {
  index: number;
  name: string;
  description: string;
}

export interface User {
  id: string;
  isAdmin: boolean;
  subscriptions: ISubscription[];
  username: string;
  avatarUrl?: string;
  registrationDate: Date;
  chatId: string;
}

// Параметры для получения всех пользователей с пагинацией
export interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "createdAt" | "username" | "registrationDate" | "isActive";
  sortOrder?: "asc" | "desc";
}

// Ответ API для получения всех пользователей с пагинацией
export interface GetAllUsersResponse {
  users: User[];
  pagination: {
    page: number; // изменено с currentPage
    totalPages: number;
    total: number; // изменено с totalUsers
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ISubscription {
  id: string;
  type: ContentType;
  active: boolean;
  startDate: Date;
  endDate: Date;
  userId: string;
  user: User;
}

export interface UserStatistics {
  total: number;
  withSubscriptions: number;
  admins: number;
}

// Статистика пользователей для рассылок
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithChatId: number;
  availableForBroadcast: number;
}

// Статистика по контенту
export interface ContentStatistics {
  folders: {
    total: number;
    byType: Record<ContentType, number>;
  };
  topics: {
    total: number;
    byType: Record<ContentType, number>;
  };
  lessons: {
    total: number;
    byType: Record<ContentType, number>;
    totalViews: number;
  };
}

export interface IStatistics {
  overview: {
    totalUsers: number;
    totalFolders: number;
    totalTopics: number;
    totalLessons: number;
    activeSubscriptions: number;
  };
  viewsStatistics: Record<ContentType, number>;
  subscriptionsByType: Record<ContentType, number>;
  topLessons: ILesson<"preview">[];
}

export enum BroadcastStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface Broadcast {
  id: string;
  status: BroadcastStatus;

  text: string;
  fileId: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  parseMode: string | null;
  disableWebPreview: boolean;

  delayMs: number;
  skipInactive: boolean;
  retryOnRateLimit: boolean;

  totalUsers: number;
  successCount: number;
  errorCount: number;
  skippedCount: number;

  errorLog: any[];

  createdAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
}

export interface UsersResponse {
  all: User[];
  available: User[];
}

export interface GetAllBroadcastsResponse {
  broadcasts: Broadcast[];
  users: UsersResponse;
  stats: UserStats;
}
