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
  number: number;
  isCompleted: boolean;
  video: T extends "full" ? string : never;
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
  viewsStatistics: Record<ContentType, number>; // Количество просмотров по типам контента
  subscriptionsByType: Record<ContentType, number>; // Количество подписок по типам
  topLessons: ILesson<"preview">[]; // Топ-5 самых просматриваемых уроков
}
