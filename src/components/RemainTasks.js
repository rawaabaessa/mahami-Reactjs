import { useMemo } from "react";
import "../assets/css/style.css";
import toDo from "../assets/img/to-do.svg";
import { useTask } from "../contexts/taskContext";

export default function RemainTasks({ date, userId, noneCompletedTaskCount }) {
  const tasks = useTask();
  const necessaryTaskCount = useMemo(() => {
    return tasks.filter((task) => {
      return (
        task.priority === "1" &&
        !task.isCompleted &&
        task.date == date &&
        task.userId == userId
      );
    });
  }, [tasks, date]).length;

  const importantTaskCount = useMemo(() => {
    return tasks.filter((task) => {
      return (
        task.priority === "2" &&
        !task.isCompleted &&
        task.date == date &&
        task.userId == userId
      );
    });
  }, [tasks, date]).length;

  const normalTaskCount = useMemo(() => {
    return tasks.filter((task) => {
      return (
        task.priority === "3" &&
        !task.isCompleted &&
        task.date == date &&
        task.userId == userId
      );
    });
  }, [tasks, date]).length;
  return (
    <div className="remain-tasks">
      <img className="toDo-img" src={toDo} alt="" />
      <div className="d-flex flex-column">
        <p className="task-num-all">
          لديك <span>{noneCompletedTaskCount}</span> مهام متبقية اليوم
        </p>
        <div className="d-flex gap-1">
          <p className="task-num necessary">{necessaryTaskCount}</p>
          <p className="necessary">ضروري</p>
        </div>
        <div className="d-flex gap-1">
          <p className="task-num important">{importantTaskCount}</p>
          <p className="important">مهم</p>
        </div>
        <div className="d-flex gap-1">
          <p className="task-num normal">{normalTaskCount}</p>
          <p className="normal">عادي</p>
        </div>
      </div>
    </div>
  );
}
