import PhoneFrame from "@/shared/components/ui/phone-frame";

const SecondStep = () => {
  return (
    <PhoneFrame>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Второй шаг</h3>
        <p className="text-xs text-gray-500">
          Содержимое будет добавлено позже
        </p>
      </div>
    </PhoneFrame>
  );
};

export default SecondStep;
