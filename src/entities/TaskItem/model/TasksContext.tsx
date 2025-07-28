// src/entities/TaskItem/model/TasksContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Task } from "./types";

interface TasksContextValue {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  replaceAll: (tasks: Task[]) => void;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

const LS_KEY = "tasks";

const loadInitialTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(loadInitialTasks);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const replaceAll = (tasks: Task[]) => setTasks(tasks);

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, replaceAll }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextValue => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within TasksProvider");
  return context;
};
