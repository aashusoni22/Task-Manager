import TaskItem from "./TaskItem";
import type { Task } from "../types/Task";
import { AnimatePresence, motion } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  startEditing: (id: number) => void;
  updatedTaskTitle: (id: number, newTitle: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleComplete,
  deleteTask,
  startEditing,
  updatedTaskTitle,
}) => {
  return (
    <motion.div
      className="flex flex-col gap-2 justify-center mt-7"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            No tasks to display
          </motion.p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              startEditing={startEditing}
              updatedTaskTitle={updatedTaskTitle}
            />
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
