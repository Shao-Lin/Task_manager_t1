import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import SearchInput from "@shared/UI/SeatchInput";
import SelectInput from "@shared/UI/SelectInput";
import styles from "./filterGroup.module.css";
import {
  setSearch,
  setStatus,
  setCategory,
  setPriority,
  selectTaskFilters,
} from "@features/taskFilters/model/slice";
import {
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "@/entities/TaskItem/model/types";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const FilterGroup = () => {
  const dispatch = useAppDispatch();
  const { search, status, category, priority } =
    useAppSelector(selectTaskFilters);

  const statusOptions: (TaskStatus | "")[] = [
    "",
    "To Do",
    "In Progress",
    "Done",
  ];
  const categoryOptions: (TaskCategory | "")[] = [
    "",
    "Bug",
    "Feature",
    "Documentation",
    "Refactor",
    "Test",
  ];
  const priorityOptions: (TaskPriority | "")[] = ["", "Low", "Medium", "High"];
  const navigate = useNavigate();

  return (
    <section className={styles.group_panel}>
      <div className={styles.search_filter}>
        <SearchInput
          value={search}
          onChange={(v) => dispatch(setSearch(v))}
          placeholder="Search Task..."
        />
      </div>
      <div className={styles.select_filter}>
        <SelectInput
          value={status}
          data={statusOptions}
          placeholder={"Status"}
          onChange={(v) => dispatch(setStatus(v as TaskStatus | ""))}
        />

        <SelectInput
          value={category}
          data={categoryOptions}
          placeholder={"Category"}
          onChange={(v) => dispatch(setCategory(v as TaskCategory | ""))}
        />

        <SelectInput
          value={priority}
          data={priorityOptions}
          placeholder={"Priority"}
          onChange={(v) => dispatch(setPriority(v as TaskPriority | ""))}
        />
      </div>
      <div className={styles.button_new_task}>
        <Button
          onClick={() => navigate("/task/new")}
          variant="filled"
          color="rgba(0, 0, 0, 1)"
        >
          New Task
        </Button>
        ;
      </div>
    </section>
  );
};
export default FilterGroup;
