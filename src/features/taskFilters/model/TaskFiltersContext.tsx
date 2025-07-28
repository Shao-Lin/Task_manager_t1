// src/features/task-filters/model/TaskFiltersContext.tsx
import React, { createContext, useContext, useState } from "react";
import type {
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from "../../../entities/TaskItem/model/types";

export interface FiltersState {
  search: string;
  status: TaskStatus | "";
  category: TaskCategory | "";
  priority: TaskPriority | "";
}

interface TaskFiltersContextValue extends FiltersState {
  setSearch: (s: string) => void;
  setStatus: (s: TaskStatus | "") => void;
  setCategory: (c: TaskCategory | "") => void;
  setPriority: (p: TaskPriority | "") => void;
  resetFilters: () => void;
}

const TaskFiltersContext = createContext<TaskFiltersContextValue | undefined>(
  undefined
);

const initialState: FiltersState = {
  search: "",
  status: "",
  category: "",
  priority: "",
};

export const TaskFiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FiltersState>(initialState);

  return (
    <TaskFiltersContext.Provider
      value={{
        ...filters,
        setSearch: (search) => setFilters((f) => ({ ...f, search })),
        setStatus: (status) => setFilters((f) => ({ ...f, status })),
        setCategory: (category) => setFilters((f) => ({ ...f, category })),
        setPriority: (priority) => setFilters((f) => ({ ...f, priority })),
        resetFilters: () => setFilters(initialState),
      }}
    >
      {children}
    </TaskFiltersContext.Provider>
  );
};

export const useTaskFilters = (): TaskFiltersContextValue => {
  const context = useContext(TaskFiltersContext);
  if (!context)
    throw new Error("useTaskFilters must be used within TaskFiltersProvider");
  return context;
};
