import { useEffect, useRef, useState } from "react";
import type { Task, FilterType } from "./types/Task";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import { Trash } from "lucide-react";
import TaskCounter from "./components/TaskCounter";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState<FilterType>(() => {
    const savedFilter = localStorage.getItem("filter");
    return savedFilter ? JSON.parse(savedFilter) : "all";
  });

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const addTask = (title: string) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      isEditing: false,
    };

    setTasks([...tasks, newTask]);
    setFilter("all");
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    return task.completed;
  });

  const clearAllTasks = () => {
    setTasks([]);
    setFilter("all");
  };

  const startEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const updateTaskTitle = (id: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, isEditing: false } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  });

  return (
    <div className="px-6 py-2 md:p-0 md:max-w-[440px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center p-4 mt-5">
        Welcome to Todo Manager
      </h1>

      <TaskCounter tasks={tasks} />
      <AddTaskForm addTask={addTask} reference={ref} />
      <div className="flex items-center justify-between">
        <Filter currentFilter={filter} setFilter={setFilter} />
        <button
          onClick={clearAllTasks}
          className="text-rose-500 font-bold text-xs md:text-sm cursor-pointer flex items-center gap-1"
        >
          Clear All <Trash size={14} strokeWidth={2.5} />
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        startEditing={startEditing}
        updatedTaskTitle={updateTaskTitle}
      />
    </div>
  );
};

export default App;
