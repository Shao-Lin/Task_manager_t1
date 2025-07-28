import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";
import { TaskFiltersProvider } from "@/features/taskFilters/model/TaskFiltersContext";
import { TasksProvider } from "@/entities/TaskItem/model/TasksContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <TasksProvider>
          <TaskFiltersProvider>
            <App />
          </TaskFiltersProvider>
        </TasksProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
