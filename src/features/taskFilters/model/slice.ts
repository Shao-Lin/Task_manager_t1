import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  TaskStatus,
  TaskPriority,
  TaskCategory,
} from "../../../entities/TaskItem/model/types";
import type { RootState } from "../../../app/store";

interface FiltersState {
  search: string;
  status: TaskStatus | "";
  category: TaskCategory | "";
  priority: TaskPriority | "";
}
const initialState: FiltersState = {
  search: "",
  status: "",
  category: "",
  priority: "",
};

const taskFiltersSlice = createSlice({
  name: "taskFilters",
  initialState,
  reducers: {
    setSearch: (s, a: PayloadAction<string>) => void (s.search = a.payload),
    setStatus: (s, a: PayloadAction<FiltersState["status"]>) =>
      void (s.status = a.payload),
    setCategory: (s, a: PayloadAction<FiltersState["category"]>) =>
      void (s.category = a.payload),
    setPriority: (s, a: PayloadAction<FiltersState["priority"]>) =>
      void (s.priority = a.payload),
    resetFilters: () => initialState,
  },
});

export const { setSearch, setStatus, setCategory, setPriority, resetFilters } =
  taskFiltersSlice.actions;
export const taskFiltersReducer = taskFiltersSlice.reducer;
export const selectTaskFilters = (state: RootState): FiltersState =>
  state.taskFilters;
