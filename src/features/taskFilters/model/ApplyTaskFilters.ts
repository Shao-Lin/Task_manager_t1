// src/shared/lib/filters/applyTaskFilters.ts
import type { Task } from "@entities/TaskItem/model/types";
import type { FiltersState } from "./TaskFiltersContext";

const passesSingleFilter = <T>(filterValue: T | "", taskValue: T): boolean =>
  filterValue === "" || filterValue === taskValue;

const passesSearch = (task: Task, query: string) => {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    task.title.toLowerCase().includes(q) ||
    task.description?.toLowerCase().includes(q)
  );
};

export const applyTaskFilters = (
  tasks: Task[],
  filters: FiltersState
): Task[] =>
  tasks.filter(
    (t) =>
      passesSingleFilter(filters.status, t.status) &&
      passesSingleFilter(filters.category, t.category) &&
      passesSingleFilter(filters.priority, t.priority) &&
      passesSearch(t, filters.search)
  );
