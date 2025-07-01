import FormButton from "@/shared/components/ui/form-button";
import { Play } from "lucide-react";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import {
  useGetBroadcastList,
  useStartBroadcast,
} from "@/shared/hooks/use-broadcast";
import { BroadcastStatus } from "@/shared/types/interfaces";
import { CheckCircle, Clock, Plus, Users, XCircle } from "lucide-react";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import { useNavigate } from "react-router-dom";

const BroadcastsAdmin = () => {
  const { data: response, isLoading, error } = useGetBroadcastList();
  const { mutate: startBroadcast } = useStartBroadcast();
  const navigate = useNavigate();

  const handleBroadcastClick = (id: string) => {
    navigate(`/admin/broadcast/${id}`);
  };

  const handleCreateBroadcast = () => {
    navigate("/admin/broadcast/create");
  };

  const handleStartBroadcast = (id: string) => {
    startBroadcast(id);
  };

  const getStatusColor = (status: BroadcastStatus) => {
    switch (status) {
      case BroadcastStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case BroadcastStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      case BroadcastStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case BroadcastStatus.FAILED:
        return "bg-red-100 text-red-800";
      case BroadcastStatus.CANCELLED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: BroadcastStatus) => {
    switch (status) {
      case BroadcastStatus.PENDING:
        return "Ожидает";
      case BroadcastStatus.IN_PROGRESS:
        return "В процессе";
      case BroadcastStatus.COMPLETED:
        return "Завершена";
      case BroadcastStatus.FAILED:
        return "Ошибка";
      case BroadcastStatus.CANCELLED:
        return "Отменена";
      default:
        return "Неизвестно";
    }
  };

  if (isLoading) {
    return (
      <ContentWrapper
        className="pt-safe-area flex flex-col justify-center"
        withFooter={false}
      >
        <LoadingOverview />
      </ContentWrapper>
    );
  }

  if (error) {
    return (
      <ContentWrapper
        className="pt-safe-area flex flex-col justify-center"
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

  // Извлекаем данные из правильной структуры
  const broadcasts = response?.broadcasts || [];
  const stats = response?.users.stats;

  return (
    <ContentWrapper className="pt-safe-area pb-4" withFooter={false}>
      <div className="px-4 space-y-4 h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-border">Рассылки</h1>
          <FormButton
            type="button"
            variant="create"
            onClick={handleCreateBroadcast}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Создать
          </FormButton>
        </div>

        {stats && (
          <div className="bg-secondary rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg border border-border">
                  <Users className="h-5 w-5 text-border" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-border">
                    Пользователи для рассылки
                  </h3>
                  <p className="text-xs text-white">
                    Активные / Всего пользователей
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  <span className="text-border">{stats.activeUsers}</span>
                  <span className="text-border mx-2">/</span>
                  <span className="text-border">{stats.totalUsers}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {broadcasts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-2">Рассылок пока нет</div>
              <FormButton
                type="button"
                variant="create"
                onClick={handleCreateBroadcast}
                className="mx-auto"
              >
                Создать первую рассылку
              </FormButton>
            </div>
          ) : (
            broadcasts.map((broadcast) => (
              <div
                key={broadcast.id}
                className="bg-secondary rounded-lg border border-border p-4 space-y-3 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-white mt-1 line-clamp-2">
                      {broadcast.text}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      broadcast.status
                    )}`}
                  >
                    {getStatusText(broadcast.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-white">
                      <Users className="h-4 w-4" />
                      <span>{broadcast.totalUsers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>{broadcast.successCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <XCircle className="h-4 w-4" />
                      <span>{broadcast.errorCount}</span>
                    </div>
                    {broadcast.skippedCount > 0 && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Clock className="h-4 w-4" />
                        <span>{broadcast.skippedCount}</span>
                      </div>
                    )}
                  </div>

                  {broadcast.status === BroadcastStatus.PENDING && (
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FormButton
                        type="button"
                        variant="update"
                        className="flex items-center gap-1 text-xs px-3 py-1"
                        onClick={() => {
                          handleStartBroadcast(broadcast.id);
                        }}
                      >
                        <Play className="h-3 w-3" />
                        Запустить
                      </FormButton>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default BroadcastsAdmin;
