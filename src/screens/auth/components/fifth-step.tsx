import FormButton from "@/shared/components/ui/form-button";
import { useUser, useUpdateUser } from "@/shared/hooks/use-user";

const FifthStep = () => {
  const { data: user } = useUser();
  const updateUser = useUpdateUser();

  console.log(user);

  const handleConnectBot = () => {
    const botUrl = import.meta.env.VITE_BOT_URL;
    if (botUrl) {
      window.open(botUrl, "_blank");
    }
  };

  const handleNext = () => {
    // Логика кнопки "Дальше" будет добавлена позже
    console.log("Дальше");
  };

  const handleSkip = () => {
    updateUser.mutate();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
      <div className="text-center max-w-sm">
        {user?.chatId ? (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Бот подключен
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              У вас уже есть подключение к боту. Можете пропустить этот шаг и
              начать пользоваться приложением.
            </p>
            <FormButton
              type="button"
              variant="create"
              className="w-full"
              onClick={handleSkip}
              isLoading={updateUser.isPending}
              disabled={updateUser.isPending}
            >
              Пропустить
            </FormButton>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Последний шаг
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Чтобы начать пользоваться приложением, подключите бота
            </p>
            <div className="flex flex-col gap-3 w-full">
              <FormButton
                type="button"
                variant="create"
                className="w-full"
                onClick={handleConnectBot}
              >
                Подключить бота
              </FormButton>
              <FormButton
                type="button"
                variant="update"
                className="w-full"
                onClick={handleNext}
              >
                Дальше
              </FormButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FifthStep;
