// src/features/task-filters/model/selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "@entities/TaskItem/model/slice";
import { selectTaskFilters } from "./slice";
import type { Task } from "@entities/TaskItem/model/types";

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

/* ───────────— selector —────────── */

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectTaskFilters],
  (tasks, filters) =>
    tasks.filter(
      (t) =>
        passesSingleFilter(filters.status, t.status) &&
        passesSingleFilter(filters.category, t.category) &&
        passesSingleFilter(filters.priority, t.priority) &&
        passesSearch(t, filters.search)
    )
);
