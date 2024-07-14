import { createContext, useContext, useReducer, useState } from "react";
import { TaskReducer } from "../reducers/TaskReducer";

export const TaskContext = createContext([]);
export const TaskDispatchContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(TaskReducer, []);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  return useContext(TaskContext);
};

export const useTaskDispatch = () => {
  return useContext(TaskDispatchContext);
};
