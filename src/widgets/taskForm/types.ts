import {
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "@/entities/TaskItem/model/types";

export interface TaskFormProps {
  task?: {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    category: TaskCategory;
    priority: TaskPriority;
    date: string;
  };
}

export const statusOptions: TaskStatus[] = ["To Do", "In Progress", "Done"];
export const categoryOptions: TaskCategory[] = [
  "Bug",
  "Feature",
  "Documentation",
  "Refactor",
  "Test",
];
export const priorityOptions: TaskPriority[] = ["Low", "Medium", "High"];
