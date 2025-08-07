import ErrorComponent from "@/shared/components/error";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import useBackButton from "@/shared/hooks/use-backbutton";
import { useAllUsers, useExportUsers } from "@/shared/hooks/use-user";
import { useState } from "react";
import type { GetAllUsersParams } from "@/shared/types/interfaces";
import Skeleton from "@/shared/components/ui/skeleton";
import useTelegram from "@/shared/hooks/use-telegram";
import { toast } from "react-hot-toast";

const UsersStatistics = () => {
  const { openInTelegramLinkFunc } = useTelegram();
  const exportUsers = useExportUsers();

  const handleUserClick = (username?: string) => {
    if (username) {
      toast.success(`Переход к @${username}`);
      openInTelegramLinkFunc(`https://t.me/${username}`);
    }
  };

  const handleExport = () => {
    exportUsers.mutate();
  };

  const [params, setParams] = useState<GetAllUsersParams>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // setParams будет использован позже для пагинации и фильтрации
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateParams = setParams;

  const { data, isLoading, error } = useAllUsers(params);

  const goToPrevPage = () => {
    if (data?.pagination.hasPrev) {
      updateParams((prev) => ({ ...prev, page: (prev.page || 1) - 1 }));
    }
  };

  const goToNextPage = () => {
    if (data?.pagination.hasNext) {
      updateParams((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
    }
  };

  useBackButton({
    isOpen: true,
  });

  if (isLoading) {
    return (
      <ContentWrapper className="pt-safe-area" withFooter={false}>
        <section className="flex flex-col gap-4 mx-auto w-[94%] text-textPrimary">
          {/* Скелетон заголовка */}
          <div className="flex justify-between items-center">
            <Skeleton height={32} width={200} borderRadius={8} />
            <div className="flex items-center gap-3">
              <Skeleton height={20} width={80} borderRadius={6} />
              <Skeleton height={36} width={80} borderRadius={8} />
            </div>
          </div>

          {/* Скелетоны карточек пользователей */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-cardBackground p-4 rounded-lg border border-borderColor"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <Skeleton height={20} width={120} borderRadius={4} />
                    <Skeleton height={16} width={180} borderRadius={4} />
                    <Skeleton height={14} width={140} borderRadius={4} />
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex items-center gap-2">
                      <Skeleton height={24} width={60} borderRadius={12} />
                      <Skeleton height={32} width={32} borderRadius={16} />
                    </div>
                    <Skeleton height={14} width={80} borderRadius={4} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Скелетон пагинации */}
          <div className="flex justify-center gap-2 mt-4">
            <Skeleton height={40} width={40} borderRadius={20} />
            <div className="flex items-center px-3">
              <Skeleton height={16} width={60} borderRadius={4} />
            </div>
            <Skeleton height={40} width={40} borderRadius={20} />
          </div>
        </section>
      </ContentWrapper>
    );
  }

  if (error || !data) {
    return (
      <ContentWrapper
        className="flex flex-col justify-center"
        withFooter={false}
      >
        <ErrorComponent
          code={500}
          title="Ошибка"
          description="Произошла ошибка при загрузке данных"
        />
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className="pt-safe-area" withFooter={false}>
      <section className="flex flex-col gap-4 mx-auto w-[94%] text-textPrimary">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Пользователи</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-textSecondary">
              Всего: {data.pagination.total}
            </span>
            <button
              onClick={handleExport}
              disabled={exportUsers.isPending}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 border-accent hover:bg-accent/10 ${
                exportUsers.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              title="Экспорт всех пользователей в Excel"
            >
              {exportUsers.isPending ? "📤..." : "📤 Excel"}
            </button>
          </div>
        </div>

        {/* Список пользователей */}
        <div className="flex flex-col gap-2">
          {data.users.map((user) => (
            <div
              key={user.id}
              className="bg-cardBackground p-4 rounded-lg border border-borderColor"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">
                    {user.username || "Нет никнейма"}
                  </span>
                  <span className="text-sm text-textSecondary">
                    ID: {user.id}
                  </span>
                  {user.registrationDate && (
                    <span className="text-xs text-textSecondary">
                      Регистрация:{" "}
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2">
                    {user.isAdmin && (
                      <span className="text-xs bg-accent text-white px-2 py-1 rounded">
                        Админ
                      </span>
                    )}
                    <button
                      onClick={() => handleUserClick(user.username)}
                      disabled={!user.username}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 border-accent hover:bg-accent/10 ${
                        !user.username ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                      title={
                        user.username
                          ? `Написать ${user.username}`
                          : "Нет никнейма"
                      }
                    >
                      💬
                    </button>
                  </div>
                  <span className="text-xs text-textSecondary">
                    Подписок: {user.subscriptions?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Информация о пагинации */}
        <div className="flex justify-between items-center text-sm text-textSecondary">
          <span>
            Страница {data.pagination.page} из {data.pagination.totalPages}
          </span>
        </div>

        {/* Кнопки пагинации */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={goToPrevPage}
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 border-accent hover:bg-accent/10"
          >
            <span
              className={`transition-opacity ${
                data.pagination.hasPrev ? "opacity-100" : "opacity-30"
              }`}
            >
              ←
            </span>
          </button>

          <span className="flex items-center text-sm text-textSecondary px-3">
            {data.pagination.page} / {data.pagination.totalPages}
          </span>

          <button
            onClick={goToNextPage}
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 border-accent hover:bg-accent/10"
          >
            <span
              className={`transition-opacity ${
                data.pagination.hasNext ? "opacity-100" : "opacity-30"
              }`}
            >
              →
            </span>
          </button>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default UsersStatistics;
