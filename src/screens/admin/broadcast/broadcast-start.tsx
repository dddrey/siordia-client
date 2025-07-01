import { BroadcastFormValues } from "@/schema/broadcast.shema";
import ErrorComponent from "@/shared/components/error";
import BroadcastForm from "@/shared/components/forms/broadcast/broadcast";
import LoadingOverview from "@/shared/components/loading-overview";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import {
  useGetBroadcast,
  useStartBroadcast,
  useTestBroadcast,
} from "@/shared/hooks/use-broadcast";
import { useParams } from "react-router-dom";

export default function BroadcastStart() {
  const { id } = useParams();
  const { mutate: startBroadcast, isPending: isLoading } = useStartBroadcast();
  const { mutate: testBroadcast, isPending: isTestLoading } =
    useTestBroadcast();
  const {
    data: broadcast,
    isLoading: isLoadingBroadcast,
    error,
  } = useGetBroadcast(id || "");

  console.log(id);

  const handleSubmit = async () => {
    startBroadcast(id || "");
  };

  const handleTestBroadcast = async (data: BroadcastFormValues) => {
    testBroadcast({
      text: data.text,
      imageUrl: data.imageUrl,
      buttonText: data.buttonText,
      buttonUrl: data.buttonUrl,
    });
  };

  if (isLoadingBroadcast) return <LoadingOverview />;

  if (error || !broadcast)
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

  return (
    <ContentWrapper
      withFooter={false}
      className="pt-safe-area flex flex-col justify-center"
    >
      <BroadcastForm
        onSubmit={handleSubmit}
        isLoading={isLoading || isTestLoading}
        title="Начать рассылку"
        handleTestBroadcast={handleTestBroadcast}
      />
    </ContentWrapper>
  );
}
