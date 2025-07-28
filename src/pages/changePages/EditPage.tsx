import TaskForm from "@/widgets/taskForm/TaskForm";
import Header from "@/widgets/taskFormHeader/Header";
import styles from "./ChangePages.module.css";
import { useParams } from "react-router-dom";
import { useTasks } from "@/entities/TaskItem/model/TasksContext";
const EditPage = () => {
  const { id } = useParams<{ id: string }>(); // ID из URL
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === id); // задача по ID

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
