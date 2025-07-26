import TaskForm from "@/widgets/taskForm/TaskForm";
import Header from "@/widgets/taskFormHeader/Header";
import styles from "./ChangePages.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from "@/entities/TaskItem/api/taskApi";
import { Task } from "@/entities/TaskItem/model/types";
const EditPage = () => {
  const { id } = useParams<{ id: string }>(); // ID из URL

  const [task, setTask] = useState<Task>();

  if (!id) return;

  useEffect(() => {
    (async () => {
      try {
        const task = await getTaskById(id);
        setTask(task);
      } catch (err) {
        console.error(err);
        throw err;
      }
    })();
  }, []);

  if (!task) return <p>Loading…</p>;

  return (
    <div className={styles.page}>
      <div className={styles.page_container}>
        <Header title="Edit task" />
        <TaskForm task={task} />
      </div>
    </div>
  );
};
export default EditPage;
