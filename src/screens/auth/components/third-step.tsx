import { Fragment, useEffect } from "react";
import { useUser, useUpdateUser } from "@/shared/hooks/use-user";
import { useAuthNavigation } from "@/shared/hooks/use-auth-navigation";
import useTelegram from "@/shared/hooks/use-telegram";

const ThirdStep = () => {
  const { data: user } = useUser();
  const updateUser = useUpdateUser();
  const { setLoading, setStepValid } = useAuthNavigation();
  const { openInTelegramLinkFunc } = useTelegram();

  // Синхронизируем состояние загрузки с хуком навигации
  useEffect(() => {
    setLoading(updateUser.isPending);
  }, [updateUser.isPending, setLoading]);

  // Устанавливаем валидность шага при монтировании
  useEffect(() => {
    setStepValid(true);
  }, [setStepValid]);

  const handleConnectBot = () => {
    const botUrl = import.meta.env.VITE_BOT_URL;
    window.Telegram.WebApp.close();
    openInTelegramLinkFunc(botUrl);
  };

  return (
    <div className="flex flex-col h-full px-4 mt-2 ">
      {!user?.chatId && (
        <Fragment>
          <p className="text-5xl font-semibold text-textAccent mb-2">
            Еще чуть-чуть и начнем тренировку!
          </p>
          <p className="text-2xl text-textSecondary mt-4">
            Осталось только подключить бота
            <br />
            <span className="text-2xl text-textSecondary">
              Чтобы получать уведомления о новых уроках и заданиях.
            </span>
          </p>
          <div className="flex w-full mt-4 flex-1 items-end justify-center mb-10">
            <button
              className=" text-textSecondary underline text-xl w-full"
              onClick={handleConnectBot}
            >
              Подключить бота
            </button>
          </div>
        </Fragment>
      )}
      {user?.chatId && (
        <Fragment>
          <p className="text-5xl font-semibold text-textAccent mb-2">
            Ваш бот успешно подключен!
          </p>
          <p className="text-2xl text-textSecondary mt-4">
            Теперь вы можете начать тренировку! 🎉
          </p>
        </Fragment>
      )}
    </div>
  );
};

export default ThirdStep;
