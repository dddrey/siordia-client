import Task from "./task";

interface TaskListProps {
  tasks: {
    name: string;
    description: string;
  }[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  if (!tasks.length) return null;

  return (
    <div className="w-[94%] mx-auto bg-primary shadow-card-sm-light rounded-[12px] p-3 mt-2 flex flex-col gap-4">
      {tasks.map((task, index) => (
        <Task key={index} index={index} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
