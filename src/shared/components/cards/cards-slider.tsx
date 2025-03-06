import Card from "./card";
import { IFolder, ITopic } from "../../types/interfaces";
import Skeleton from "../ui/skeleton";

interface CardsSliderProps {
  items: (IFolder | ITopic)[];
  title: string;
  icon: string;
  isLoading: boolean;
  isError: boolean;
}

const CardsSlider = ({
  items,
  title,
  isLoading,
  isError,
  icon,
}: CardsSliderProps) => {
  return (
    <section className="w-full bg-primary rounded-xl shadow-card-light py-[10px]">
      <h2 className="text-[20px] pl-[10px] font-bold mb-[10px]">
        <span className="gradient-text">{title} </span>
        <span>{icon}</span>
      </h2>

      {isError ? (
        <div className="mx-auto text-center text-[18px] font-medium py-[30px] text-red-500">
          Ошибка при загрузке данных
        </div>
      ) : (
        <div className="flex overflow-x-scroll flex-row relative scroll-smooth carousel-body gap-[10px] px-[10px] pb-[2px]">
          {isLoading &&
            [1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                width={200}
                height={300}
                className="shrink-0"
              />
            ))}
          {!isLoading &&
            items.map((item) => <Card key={item.id} item={item} />)}
        </div>
      )}
      {items.length === 0 && !isLoading && !isError && (
        <div className="mx-auto text-center text-[18px] font-medium py-[30px] text-textSecondary">
          Нет элементов
        </div>
      )}
    </section>
  );
};

export default CardsSlider;
