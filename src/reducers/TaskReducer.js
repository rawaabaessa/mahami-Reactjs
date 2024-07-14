import { v4 as uuidv4 } from "uuid";

export const TaskReducer = (currentTasks, action) => {
  switch (action.type) {
    case "add": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.addInput.title,
        category: action.payload.addInput.category,
        priority: action.payload.addInput.priority,
        startTime: action.payload.addInput.startTime,
        endTime: action.payload.addInput.endTime,
        userId: action.payload.userId,
        date: new Date(action.payload.addInput.date).toLocaleDateString(),
        isCompleted: false,
      };
      const updatedTask = [...currentTasks, newTask];
      localStorage.setItem("todo", JSON.stringify(updatedTask));

      return updatedTask;
    }
    case "edit": {
      const updatedTask = currentTasks.map((task) => {
        if (task.id == action.payload.id) {
          return {
            ...task,
            title: action.payload.title,
            category: action.payload.category,
            priority: action.payload.priority,
            startTime: action.payload.startTime,
            endTime: action.payload.endTime,
          };
        } else {
          return task;
        }
      });
      localStorage.setItem("todo", JSON.stringify(updatedTask));
      return updatedTask;
    }
    case "delete": {
      console.log(action.payload);
      const updatedTasks = currentTasks.filter((task) => {
        return task.id != action.payload;
      });
      localStorage.setItem("todo", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "get": {
      const storageTask = JSON.parse(localStorage.getItem("todo")) ?? [];
      return storageTask;
    }
    case "check": {
      console.log(action);
      const updatedTask = currentTasks.map((task) => {
        if (task.id == action.payload.id) {
          const updated = { ...task, isCompleted: !task.isCompleted };
          return updated;
        }
        return task;
      });
      localStorage.setItem("todo", JSON.stringify(updatedTask));
      return updatedTask;
    }
    default:
      throw Error("unknown action" + action.type);
  }
};
