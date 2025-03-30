import { Link, useNavigate } from "react-router-dom";
import { IFolder, ITopic } from "../../types/interfaces";
import LogoImage from "../logo-Image";
import useTelegram from "@/shared/hooks/use-telegram";

interface CardProps {
  item: IFolder | ITopic;
}

const Card = ({ item }: CardProps) => {
  const { setHapticFeedback } = useTelegram();
  const navigate = useNavigate();

  const handleClickSubscribe = () => {
    setHapticFeedback();
    navigate(`/subscriptions`);
  };

  const isFolder = "topics" in item;
  return (
    <div>
      <div className="relative w-[220px] bg-primary border border-border rounded-[12px] overflow-hidden px-2 pt-[8px] pb-[6px]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2  w-full max-w-[212px] z-[5] flex justify-between items-center">
          <button
            onClick={handleClickSubscribe}
            className="bg-primary text-textPrimary font-semibold text-[10px] px-[6px] py-[2px] rounded-[16px] border border-border"
          >
            Оформить +
          </button>
          <button className="bg-primary text-textPrimary font-semibold text-[10px] px-[6px] py-[2px] rounded-[16px] border border-border">
            {isFolder
              ? `Тем: ${(item as IFolder).topics.length}`
              : `Уроков: ${(item as ITopic).lessons.length}`}
          </button>
        </div>
        <div className="w-full max-w-[200px] mx-auto rounded-[12px] overflow-hidden">
          <LogoImage type="small" title={"SKILL UP"} />
        </div>
        <div className="w-full h-[100px] rounded-lg flex flex-col justify-center items-center">
          <p className="text-textPrimary text-[18px] font-[600] mt-1">
            {item.name}
          </p>
          <p className="text-textPrimary opacity-65 text-[12px] mb-2">
            {item.about}
          </p>
          <Link
            onClick={setHapticFeedback}
            to={`/folders/${item.id}`}
            className="bg-primary flex justify-center items-center text-textPrimary font-medium text-[12px] px-2 py-1 rounded-[12px] w-full h-[36px] border border-border"
          >
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
