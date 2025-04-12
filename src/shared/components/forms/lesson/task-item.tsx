import { Trash2 } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LessonFormValues } from "@/schema/lesson.schema";
import { DraggableProvided } from "react-beautiful-dnd";

interface TaskItemProps {
  index: number;
  register: UseFormRegister<LessonFormValues>;
  errors: FieldErrors<LessonFormValues>;
  isLoading: boolean;
  isSubmitting: boolean;
  provided: DraggableProvided;
  onRemove: () => void;
}

const TaskItem = ({
  index,
  register,
  errors,
  isLoading,
  isSubmitting,
  onRemove,
}: TaskItemProps) => {
  return (
    <div className="relative p-4 rounded-lg bg-primary shadow-card-sm-light">
      <div className="flex items-center gap-4 mb-4">
        <h4 className="text-sm font-medium flex-grow text-textPrimary">
          Задание {index + 1}
        </h4>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-600 transition p-1"
          disabled={isLoading || isSubmitting}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-textPrimary">
            Название задания
          </label>
          <input
            {...register(`tasks.${index}.name` as const)}
            placeholder="Введите название задания"
            className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-textPrimary outline-none focus:border-blue-500 placeholder:text-gray-500"
            disabled={isLoading || isSubmitting}
          />
          {errors?.tasks?.[index]?.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.tasks[index]?.name?.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-textPrimary">
            Описание задания
          </label>
          <textarea
            {...register(`tasks.${index}.description` as const)}
            placeholder="Введите описание задания"
            className="mt-1 w-full rounded-md border border-border bg-primary px-3 py-2 text-sm text-textPrimary outline-none focus:border-blue-500 placeholder:text-gray-500 resize-none"
            disabled={isLoading || isSubmitting}
            rows={3}
          />
          {errors?.tasks?.[index]?.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.tasks[index]?.description?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
