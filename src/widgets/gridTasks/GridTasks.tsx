import { applyTaskFilters } from "@/features/taskFilters/model/ApplyTaskFilters";
import TaskItem from "../../entities/TaskItem/model/TaskItem";
import styles from "./GridTasks.module.css";
import { useTaskFilters } from "@/features/taskFilters/model/TaskFiltersContext";
import { useTasks } from "@/entities/TaskItem/model/TasksContext";
const GridTasks = () => {
  const { tasks } = useTasks();
  const filters = useTaskFilters();
  const filteredTasks = applyTaskFilters(tasks, filters);
  return (
    <div className={styles.grid_container}>
      {filteredTasks.map((item) => (
        <TaskItem key={item.id} {...item} />
      ))}
    </div>
  );
};
export default GridTasks;
