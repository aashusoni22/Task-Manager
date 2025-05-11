import { CheckCircle, Clock, Trophy } from "lucide-react";
import type { Task } from "../types/Task";

interface TaskCounterProps {
  tasks: Task[];
}

const TaskCounter: React.FC<TaskCounterProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <div className="flex gap-6 text-sm text-neutral-700 mt-4 justify-center">
      <span className="flex items-center">
        <CheckCircle
          size={16}
          className="mr-2 text-neutral-600"
          strokeWidth={2.5}
        />{" "}
        Total: {total}
      </span>
      <span className="flex items-center">
        <Trophy size={16} className="mr-2 text-emerald-500" strokeWidth={2.5} />{" "}
        Completed: {completed}
      </span>
      <span className="flex items-center">
        <Clock size={16} className="mr-2 text-yellow-500" strokeWidth={2.5} />{" "}
        Pending: {pending}
      </span>
    </div>
  );
};

export default TaskCounter;
