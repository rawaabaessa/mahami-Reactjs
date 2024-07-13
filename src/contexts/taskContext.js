import { createContext, useContext, useState } from "react";
import { Tasks } from "../data/Tasks";

export const TaskContext = createContext([]);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(Tasks);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};
