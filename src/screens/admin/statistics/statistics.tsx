import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import { useStatistics } from "@/shared/hooks/use-statistics";
import {
  Eye,
  Users,
  CreditCard,
  BookOpen,
  Folder,
  Book,
  Home,
  CreditCard as SubscriptionIcon,
  Info,
  GraduationCap,
} from "lucide-react";
import ErrorComponent from "@/shared/components/error";
import LoadingOverview from "@/shared/components/loading-overview";
import useBackButton from "@/shared/hooks/use-backbutton";
import { handleOpenAppLink } from "@/shared/utils/uri-links";
import StatCard from "./stat-card";

const StatisticsScreen = () => {
  const { data, isLoading, error } = useStatistics();
  useBackButton({
    isOpen: true,
  });

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
          link="/admin/statistics/users"
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
      <section className="bg-primary text-textPrimary shadow-card-sm-light rounded-[10px] p-4 mt-3 w-[94%] mx-auto">
        <h3 className="text-lg font-semibold mb-3">Ссылки на приложения</h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOpenAppLink("/")}
            className="bg-bgSecondary hover:bg-bgSecondary/80 transition-colors duration-200 text-textPrimary rounded-[10px] p-3 flex items-center gap-3 border border-borderPrimary/10"
          >
            <Home size={20} />
            <span className="text-[16px] font-medium">Главная</span>
          </button>
          <button
            onClick={() => handleOpenAppLink("/subscriptions")}
            className="bg-bgSecondary hover:bg-bgSecondary/80 transition-colors duration-200 text-textPrimary rounded-[10px] p-3 flex items-center gap-3 border border-borderPrimary/10"
          >
            <SubscriptionIcon size={20} />
            <span className="text-[16px] font-medium">Подписки</span>
          </button>
          <button
            onClick={() => handleOpenAppLink("/about")}
            className="bg-bgSecondary hover:bg-bgSecondary/80 transition-colors duration-200 text-textPrimary rounded-[10px] p-3 flex items-center gap-3 border border-borderPrimary/10"
          >
            <Info size={20} />
            <span className="text-[16px] font-medium">О нас</span>
          </button>
          <button
            onClick={() => handleOpenAppLink("/school")}
            className="bg-bgSecondary hover:bg-bgSecondary/80 transition-colors duration-200 text-textPrimary rounded-[10px] p-3 flex items-center gap-3 border border-borderPrimary/10"
          >
            <GraduationCap size={20} />
            <span className="text-[16px] font-medium">Школа</span>
          </button>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default StatisticsScreen;
