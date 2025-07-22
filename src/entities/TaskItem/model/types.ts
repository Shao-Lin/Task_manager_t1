export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskCategory =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  date: string; // ISO‑строка
}
