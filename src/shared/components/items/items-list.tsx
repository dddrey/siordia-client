import { IFolder, ILesson, ITopic } from "../../types/interfaces";
import { Fragment, useState } from "react";
import FolderItem from "./item";
import ErrorComponent from "../error";
import Skeleton from "../ui/skeleton";
import { cn } from "@/shared/utils/cn";

interface ItemsListProps {
  items: IFolder[] | ITopic[] | ILesson<"preview">[];
  title: string;
  subtitle?: string;
  href: string;
  params?: string;
  isLoading?: boolean;
  isError?: boolean;
  onClick?: (id: string) => void;
  type?: "default" | "permission";
  hasAccess?: boolean;
  limit?: number;
  className?: string;
  color?: string;
  isSoon?: boolean;
}

const ItemsList = ({
  items,
  title,
  href,
  isLoading,
  isError,
  subtitle,
  type = "default",
  onClick,
  params,
  hasAccess = false,
  className,
  limit = 10,
  color = "textAccent",
  isSoon = false,
}: ItemsListProps) => {
  const [displayCount, setDisplayCount] = useState(limit);
  const hasMoreItems = items.length > displayCount;

  const displayedItems = items.slice(0, displayCount);

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + limit);
  };

  if (isSoon) {
    return (
      <div className="w-full h-full flex flex-col gap-[4px] mt-4">
        <div
          className={cn(
            "w-full mx-auto px-4 py-3 bg-primary shadow-card-sm-light rounded-[10px] flex items-center justify-between"
          )}
        >
          <p className={`text-[16px] font-medium text-${color}`}>{title}</p>
          <p className={`text-[12px] font-medium text-${color}`}>{subtitle}</p>
        </div>
        <p
          className={`text-[18px] font-medium mx-auto mt-10 mb-2 text-${color} text-opacity-50`}
        >
          Скоро появится
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full h-full flex flex-col gap-[4px] mt-4">
        <div className="w-[94%] mx-auto h-[48px] mb-1">
          <Skeleton height={48} width={"100%"} borderRadius={10} />
        </div>
        <div className="w-[94%] mx-auto h-[48px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              height={56}
              width={"100%"}
              borderRadius={10}
              className="mb-1"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="mt-5">
        <ErrorComponent
          code={500}
          withButton={false}
          title="Упс! Ошибка"
          description="Произошла ошибка при загрузке данных. Попробуйте еще раз. Возможно проблема на нашей стороне"
        />
      </div>
    );
  }

  return (
    <section
      className={cn(
        "w-[94%] mx-auto h-full flex flex-col gap-[4px] pt-5 pb-8",
        className
      )}
    >
      <div
        className={cn(
          "w-full mx-auto px-4 py-3 bg-primary shadow-card-sm-light rounded-[10px] flex items-center justify-between"
        )}
      >
        <p className={`text-[16px] font-medium text-${color}`}>{title}</p>
        <p className={`text-[12px] font-medium text-${color}`}>{subtitle}</p>
      </div>
      {items.length === 0 && (
        <Fragment>
          <p
            className={`text-[18px] font-medium mx-auto mt-10 mb-2 text-${color} text-opacity-50`}
          >
            Нет элементов
          </p>
        </Fragment>
      )}
      {displayedItems.map((item) => {
        const hasSubscriptionField = "isSubscriptionRequired" in item;
        return (
          <FolderItem
            item={{
              id: item.id,
              href: `${href}/${item.id}${params ? params : ""}`,
              title: item.name,
              type: type,
              hasAccess: hasSubscriptionField
                ? !item.isSubscriptionRequired || hasAccess
                : true,
            }}
            color={color}
            onClick={onClick}
            key={item.id}
          />
        );
      })}

      {hasMoreItems && (
        <button
          onClick={handleShowMore}
          className={cn(
            "w-full mx-auto py-3 bg-primary shadow-card-sm-light rounded-[10px] flex items-center justify-center gap-2",
            className
          )}
        >
          <p className={`text-[16px] font-medium text-${color}`}>
            Показать еще
          </p>
          <svg
            className={`w-5 h-5 text-${color}`}
            fill="none"
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
      {displayedItems.length > 5 && <div className="mb-10" />}
    </section>
  );
};

export default ItemsList;
