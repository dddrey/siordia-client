import { BroadcastFormValues } from "@/schema/broadcast.shema";
import BroadcastForm from "@/shared/components/forms/broadcast/broadcast";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import {
  useCreateBroadcast,
  useTestBroadcast,
} from "@/shared/hooks/use-broadcast";
import useBackButton from "@/shared/hooks/use-backbutton";

const BroadcastCreate = () => {
  useBackButton({
    isOpen: true,
  });
  const { mutate: createBroadcast, isPending: isLoading } =
    useCreateBroadcast();
  const { mutate: testBroadcast, isPending: isTestLoading } =
    useTestBroadcast();

  const handleSubmit = async (data: BroadcastFormValues) => {
    createBroadcast({
      text: data.text,
      imageUrl: data.imageUrl,
      buttonText: data.buttonText,
      buttonUrl: data.buttonUrl,
    });
  };

  const handleTestBroadcast = async (data: BroadcastFormValues) => {
    testBroadcast({
      text: data.text,
      imageUrl: data.imageUrl,
      buttonText: data.buttonText,
      buttonUrl: data.buttonUrl,
    });
  };

  return (
    <ContentWrapper withFooter={false} className="flex flex-col justify-center">
      <BroadcastForm
        onSubmit={handleSubmit}
        isLoading={isLoading || isTestLoading}
        title="Создать рассылку"
        handleTestBroadcast={handleTestBroadcast}
      />
    </ContentWrapper>
  );
};

export default BroadcastCreate;
