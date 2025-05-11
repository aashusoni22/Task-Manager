import { useState } from "react";
import { motion } from "framer-motion";

interface AddTaskFormProps {
  addTask: (title: string) => void;
  reference: React.RefObject<HTMLInputElement | null>;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask, reference }) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center mb-4 gap-2 justify-center mt-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base w-full md:w-84 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        ref={reference}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button
        type="submit"
        className="bg-neutral-900 text-white px-2 py-2 text-sm w-24 md:text-base md:px-4 md:py-2 rounded-md hover:bg-neutral-800"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add Task
      </motion.button>
    </motion.form>
  );
};

export default AddTaskForm;
