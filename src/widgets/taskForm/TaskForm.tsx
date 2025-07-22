import SearchInput from "@/shared/UI/SeatchInput";
import styles from "./TaskForm.module.css";
import SelectInput from "@/shared/UI/SelectInput";
import { Button, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addTask, updateTask } from "@/entities/TaskItem/model/slice";
import { useDispatch } from "react-redux";
import dateHelper from "@/shared/lib/dateHelper";
import { v4 as uuidv4 } from "uuid";

import type {
  TaskStatus,
  TaskCategory,
  TaskPriority,
} from "@/entities/TaskItem/model/types";
import { useNavigate } from "react-router-dom";
import {
  categoryOptions,
  priorityOptions,
  statusOptions,
  TaskFormProps,
} from "./types";

/* ───── Опции для селектов ───── */

/* ───── Yup‑схема валидации ───── */
const schema = Yup.object({
  title: Yup.string().required("Введите название"),
  description: Yup.string().required("Описание обязательно"),
  status: Yup.string().required(),
  category: Yup.string().required(),
  priority: Yup.string().required(),
});

const TaskForm = ({ task }: TaskFormProps) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValues = task
    ? task
    : {
        id: uuidv4(),
        title: "",
        description: "",
        status: "" as TaskStatus,
        category: "" as TaskCategory,
        priority: "" as TaskPriority,
        date: dateHelper(),
      };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        if (task) {
          dispatch(updateTask(values));
        } else {
          dispatch(addTask(values));
        }
        navigate("/");
      }}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={styles.main}>
          {/* Левая колонка */}
          <section className={styles.fields}>
            {/* Заголовок задачи */}
            <SearchInput
              value={values.title}
              placeholder="Название задачи"
              onChange={(v) => setFieldValue("title", v)}
              error={touched.title && errors.title}
            />

            {/* Описание */}
            <Textarea
              placeholder="Опишите задачу"
              value={values.description}
              onChange={(e) =>
                setFieldValue("description", e.currentTarget.value)
              }
              error={touched.description && errors.description}
            />

            {/* Статус */}
            <SelectInput
              value={values.status}
              data={statusOptions}
              placeholder="Статус"
              onChange={(v) => setFieldValue("status", v)}
              error={touched.status && errors.status}
            />

            {/* Категория */}
            <SelectInput
              value={values.category}
              data={categoryOptions}
              placeholder="Категория"
              onChange={(v) => setFieldValue("category", v)}
              error={touched.category && errors.category}
            />

            {/* Приоритет */}
            <SelectInput
              value={values.priority}
              data={priorityOptions}
              placeholder="Приоритет"
              onChange={(v) => setFieldValue("priority", v)}
              error={touched.priority && errors.priority}
            />

            {/* Дата дедлайна */}
            <DatePickerInput
              placeholder="Выберите день"
              value={values.date}
              onChange={(d) => setFieldValue("dueDate", d)}
              valueFormat="MMM D YYYY"
              disabled={true}
            />
          </section>

          {/* Правая колонка (кнопки) */}
          <section className={styles.actions}>
            <Button onClick={() => navigate("/")} variant="default">
              Отмена
            </Button>

            <Button variant="filled" color="rgba(0,0,0,1)" type="submit">
              Сохранить
            </Button>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
