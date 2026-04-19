import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage.ts';
import { Task, TaskFormData } from '../types.ts';

const TASKS_KEY = 'taskflow_tasks';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  const addTask = useCallback((data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...data } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const getTask = useCallback((id: string) => {
    return tasks.find((task) => task.id === id);
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTask,
  };
}
