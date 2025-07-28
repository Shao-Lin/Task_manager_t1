import { useEffect, useState } from "react";
import MyChip from "../UI/MyChip";
import styles from "./TaskItem.module.css";
import { Clock } from "lucide-react";
import { FaCircleHalfStroke, FaCircle } from "react-icons/fa6";
import { GoDash } from "react-icons/go";
import { Dot } from "lucide-react";
import type { Task } from "./types";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useTasks } from "./TasksContext";

const TaskItem = ({
  id,
  title,
  description,
  category,
  status,
  priority,
  date,
}: Task) => {
  const [icon, setIcon] = useState<React.ReactElement>(<Clock />);
  const navigate = useNavigate();
  const { deleteTask } = useTasks();

  useEffect(() => {
    switch (status) {
      case "To Do":
        setIcon(<Clock />);
        break;
      case "In Progress":
        setIcon(<FaCircleHalfStroke />);
        break;
      case "Done":
        setIcon(<FaCircle />);
        break;
    }
  }, [status]);
  return (
    <article className={styles.task}>
      <div className={styles.task_container}>
        <div className={styles.top_section}>
          <div className={styles.title_container}>
            <p className={styles.title}>{title}</p>
            <div onClick={() => deleteTask(id)} className={styles.trash}>
              <FaTrashAlt />
            </div>
          </div>

          <p className={styles.description}>{description}</p>
          <div className={styles.chip_container}>
            <MyChip title={category} icon={<Dot />} />
            <MyChip title={status} icon={icon} />
            <MyChip title={priority} icon={<GoDash />} />
          </div>
        </div>
      </div>
      <div
        className={styles.bottom_section}
        onClick={() => navigate(`/task/${id}`)}
      >
        <div className={styles.click_container}>
          <p className={styles.click}> Click to edit</p>
        </div>
        <div className={styles.date_container}>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </article>
  );
};
export default TaskItem;
