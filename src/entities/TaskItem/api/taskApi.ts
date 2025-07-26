import axios from "axios";
import { Task } from "../model/types";
import { FiltersState } from "@/features/taskFilters/model/types";

const instance = axios.create({ baseURL: "http://localhost:3000/api" });

export const getAllTasks = async (f: FiltersState) => {
  console.log(f.search);
  try {
    const { data } = await instance.get<Task[]>("/tasks", { params: f });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateTask = async (payload: Task) => {
  try {
    await instance.put<Task>(`/tasks/${payload.id}`, payload);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTask = async (payload: Task) => {
  try {
    await instance.post(`/tasks`, payload);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const { data } = await instance.get(`/tasks/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    await instance.delete(`/tasks/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
