import { Plus } from "lucide-react";
import {
  useFieldArray,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import { LessonFormValues } from "@/schema/lesson.schema";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useTelegram from "@/shared/hooks/use-telegram";
import TaskItem from "./task-item";

interface TaskListProps {
  register: UseFormRegister<LessonFormValues>;
  control: Control<LessonFormValues>;
  errors: FieldErrors<LessonFormValues>;
  isLoading: boolean;
  isSubmitting: boolean;
}

const TaskList = ({
  register,
  control,
  errors,
  isLoading,
  isSubmitting,
}: TaskListProps) => {
  const { setHapticFeedback } = useTelegram();
  const { fields, append, remove } = useFieldArray({
    name: "tasks",
    control,
  });

  const onDragEnd = () => {
    console.log("drag end");
  };

  return (
    <div className="space-y-4 pt-[100px]">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-textPrimary">Задания</label>
        <button
          type="button"
          onClick={() => {
            setHapticFeedback();
            append({
              name: "",
              description: "",
              index: fields.length,
            });
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-md transition disabled:opacity-50"
          disabled={isLoading || isSubmitting}
        >
          <Plus size={16} />
          Добавить задание
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <TaskItem
                      index={index}
                      register={register}
                      errors={errors}
                      isLoading={isLoading}
                      isSubmitting={isSubmitting}
                      provided={provided}
                      onRemove={() => {
                        setHapticFeedback();
                        remove(index);
                      }}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {fields.length === 0 && (
        <div className="text-center p-8 border border-border rounded-lg">
          <p className="text-sm text-gray-500">Нет добавленных заданий</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
