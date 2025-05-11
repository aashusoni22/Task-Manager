export type Task = {
  id: number;
  title: string;
  completed: boolean;
  isEditing: boolean;
};

export type FilterType = "all" | "active" | "completed";
