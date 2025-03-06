import ErrorComponent from "@/shared/components/error";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";

const page = () => {
  return (
    <ContentWrapper
      withLayout={false}
      className="flex flex-col gap-[10px] items-center justify-center"
    >
      <ErrorComponent
        code={500}
        title="Упс! проблема с авторизацией"
        description="Телеграмм не передал ваши данные, перезайдите в приложение"
        withButton
        buttonText="Перезайти"
        buttonHref="/"
      />
    </ContentWrapper>
  );
};

export default page;
