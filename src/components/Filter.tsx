import type { FilterType } from "../types/Task";
import { motion } from "framer-motion";

interface FilterProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ currentFilter, setFilter }) => {
  return (
    <div className="flex gap-2">
      {["all", "active", "completed"].map((filter) => (
        <motion.button
          key={filter}
          onClick={() => setFilter(filter as FilterType)}
          className={`${
            currentFilter === filter
              ? "bg-neutral-900 text-white"
              : "bg-white text-neutral-900 border border-neutral-200"
          } px-2 py-1 text-sm md:text-base md:px-4 md:py-2 rounded-md`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};

export default Filter;
