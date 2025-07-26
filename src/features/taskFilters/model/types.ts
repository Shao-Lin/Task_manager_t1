import {
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "@/entities/TaskItem/model/types";

export interface FiltersState {
  search: string;
  status: TaskStatus | "";
  category: TaskCategory | "";
  priority: TaskPriority | "";
}
