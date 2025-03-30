import withAdmin from "@/shared/components/hoc/admin";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useStatistics } from "@/shared/hooks/use-statistics";
import { Eye, Users, CreditCard, BookOpen, Folder, Book } from "lucide-react";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";

const StatisticsScreen = () => {
  const { data, isLoading, error } = useStatistics();

  if (isLoading) return <LoadingOverview />;

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
      <section className="flex flex-col gap-2 mx-auto w-[94%] text-textPrimary">
        <StatCard
          title="Пользователи"
          value={data.overview.totalUsers}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Подписок футболистов"
          value={data.subscriptionsByType.player}
          icon={<CreditCard size={20} />}
        />
        <StatCard
          title="Подписок тренеров"
          value={data.subscriptionsByType.coach}
          icon={<CreditCard size={20} />}
        />
        <StatCard
          title="Подписок родителей"
          value={data.subscriptionsByType.parent}
          icon={<CreditCard size={20} />}
        />
        <StatCard
          title="Папки"
          value={data.overview.totalFolders}
          icon={<Folder size={20} />}
        />
        <StatCard
          title="Темы"
          value={data.overview.totalTopics}
          icon={<Book size={20} />}
        />
        <StatCard
          title="Уроки"
          value={data.overview.totalLessons}
          icon={<BookOpen size={20} />}
        />
      </section>

      <section className="bg-primary text-textPrimary shadow-card-sm-light rounded-[10px] p-4 mt-3 w-[94%] mx-auto">
        <h3 className="text-lg font-semibold mb-3">Популярные уроки</h3>
        <div className="space-y-2">
          {data.topLessons.length > 0 ? (
            data.topLessons.slice(0, 5).map((lesson) => (
              <div
                key={lesson.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-[16px]">{lesson.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-textPrimary font-semibold text-[20px]">
                    {lesson.views}
                  </span>
                  <Eye size={20} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-[18px] font-medium text-textPrimary/70 text-center my-10">
              Нет популярных уроков
            </p>
          )}
        </div>
      </section>
    </ContentWrapper>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-primary flex justify-between items-center shadow-card-sm-light rounded-[10px] p-3">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[16px] font-medium text-textPrimary">{title}</span>
    </div>
    <p className="text-3xl font-bold text-textPrimary">{value}</p>
  </div>
);

StatisticsScreen.displayName = "StatisticsScreen";

const WrappedStatisticsScreen = withAdmin(StatisticsScreen) as React.FC;
WrappedStatisticsScreen.displayName = "WrappedStatisticsScreen";

export default WrappedStatisticsScreen;
