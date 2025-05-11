import { Pencil, Save, Trash2 } from "lucide-react";
import type { Task } from "../types/Task";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  startEditing: (id: number) => void;
  updatedTaskTitle: (id: number, newTitle: string) => void;
}

const taskVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 },
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleComplete,
  deleteTask,
  startEditing,
  updatedTaskTitle,
}) => {
  const [editedTitle, setEditedTitle] = useState<string>(task.title);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updatedTaskTitle(task.id, editedTitle);
    }
  };

  const handleSave = () => {
    updatedTaskTitle(task.id, editedTitle);
  };

  return (
    <motion.div
      className={`flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-2 md:py-3 ${
        task.completed ? "bg-neutral-100" : "bg-white"
      }`}
      variants={taskVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div whileTap={{ scale: 0.9 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="mr-2 accent-neutral-900"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {task.isEditing ? (
          <motion.div
            className="flex items-center gap-2 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-300 rounded-md px-3 md:py-1 w-full focus:outline-none focus:ring-2 focus:ring-neutral-900"
              autoFocus
            />
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Save
                size={16}
                className="text-blue-500 hover:text-blue-700 transition duration-200 cursor-pointer"
              />
            </motion.button>
          </motion.div>
        ) : (
          <motion.span
            layout
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            className={`flex-1 text-left ${
              task.completed ? "text-neutral-500" : "text-neutral-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {task.title}
          </motion.span>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {!task.isEditing && (
          <motion.button
            onClick={() => startEditing(task.id)}
            className="text-neutral-500 hover:text-neutral-700 transition duration-200 font-bold text-sm cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Pencil size={16} />
          </motion.button>
        )}
        <motion.button
          onClick={() => deleteTask(task.id)}
          className="text-rose-400 hover:text-rose-600 transition duration-200 font-bold text-sm cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
