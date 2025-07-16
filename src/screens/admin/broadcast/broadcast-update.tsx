import { BroadcastFormValues } from "@/schema/broadcast.shema";
import ErrorComponent from "@/shared/components/error";
import BroadcastForm from "@/shared/components/forms/broadcast/broadcast";
import LoadingOverview from "@/shared/components/loading-overview";
import FormButton from "@/shared/components/ui/form-button";
import ContentWrapper from "@/shared/components/wrappers/content-wrapper";
import useBackButton from "@/shared/hooks/use-backbutton";
import {
  useGetBroadcast,
  useDeleteBroadcast,
  useTestBroadcast,
  useUpdateBroadcast,
} from "@/shared/hooks/use-broadcast";
import { useParams } from "react-router-dom";

export default function BroadcastUpdate() {
  useBackButton({
    isOpen: true,
  });
  const { id } = useParams();
  const { mutate: testBroadcast, isPending: isTestLoading } =
    useTestBroadcast();
  const { mutate: updateBroadcast, isPending: isUpdateLoading } =
    useUpdateBroadcast();
  const { mutate: deleteBroadcast, isPending: isDeleteLoading } =
    useDeleteBroadcast();
  const {
    data: broadcast,
    isLoading: isLoadingBroadcast,
    error,
  } = useGetBroadcast(id || "");

  console.log(id);

  const handleDelete = () => {
    deleteBroadcast(id || "");
  };

  const handleUpdate = async (data: BroadcastFormValues) => {
    if (id) {
      updateBroadcast({ id, data });
    }
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
    <ContentWrapper withFooter={false} className="flex flex-col justify-center">
      <BroadcastForm
        onSubmit={handleUpdate}
        broadcast={broadcast}
        isLoading={isUpdateLoading || isTestLoading}
        title="Начать рассылку"
        handleTestBroadcast={handleTestBroadcast}
      >
        <FormButton
          type="button"
          onClick={handleDelete}
          variant="delete"
          className="w-full"
          isLoading={isDeleteLoading}
        >
          Удалить рассылку
        </FormButton>
        <FormButton type="button" variant="update" className="w-full">
          Протестировать рассылку
        </FormButton>
      </BroadcastForm>
    </ContentWrapper>
  );
}
