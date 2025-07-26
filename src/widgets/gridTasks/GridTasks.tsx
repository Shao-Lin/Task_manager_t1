import { useEffect, useState } from "react";
import TaskItem from "../../entities/TaskItem/model/TaskItem";
import styles from "./GridTasks.module.css";
import { useAppSelector } from "@/shared/lib/hooks";
import { deleteTask, getAllTasks } from "@/entities/TaskItem/api/taskApi";
import { Task } from "@/entities/TaskItem/model/types";
import { selectTaskFilters } from "@/features/taskFilters/model/slice";
const GridTasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const filters = useAppSelector(selectTaskFilters);
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllTasks(filters);
        setAllTasks(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [filters]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id); // запрос к бэку
      setAllTasks((prev) => prev.filter((t) => t.id !== id)); // обновляем UI
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.grid_container}>
      {allTasks.map((item) => (
        <TaskItem key={item.id} {...item} onDelete={handleDelete} />
      ))}
    </div>
  );
};
export default GridTasks;
