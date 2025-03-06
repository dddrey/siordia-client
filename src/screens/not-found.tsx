import ErrorComponent from "@/shared/components/error";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";

const NotFoudScreen = () => {
  return (
    <ContentWrapper
      withLayout={false}
      className="flex flex-col gap-[10px] items-center justify-center"
    >
      <ErrorComponent
        code={404}
        withButton
        title="Упс! Страница не найдена"
        description="Страница, которую вы ищете, не существует или была перемещена"
      />
    </ContentWrapper>
  );
};

export default NotFoudScreen;
