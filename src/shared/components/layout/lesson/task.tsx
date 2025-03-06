import TextContainer from "../../text-container";
import { ITask } from "../../../types/interfaces";

interface TaskProps {
  index: number;
  task: ITask;
}

const Task = ({ index, task }: TaskProps) => {
  return (
    <TextContainer
      key={index}
      isExpandedProp={index === 0}
      title={
        <div className="flex gap-2 items-center">
          <span className="text-textPrimary font-semibold w-6 h-6 rounded-full bg-inherit border border-textPrimary text-[12px] flex items-center justify-center">
            {index + 1}
          </span>
          <p className="text-textPrimary text-[14px] font-semibold">
            {task.name}
          </p>
        </div>
      }
      text={task.description}
      textClassName="ml-2"
    />
  );
};

export default Task;
