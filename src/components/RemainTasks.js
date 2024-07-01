import "../assets/css/style.css";
import toDo from "../assets/img/to-do.svg";

export default function RemainTasks({
  necessaryTaskCount,
  importantTaskCount,
  normalTaskCount,
  noneCompletedTaskCount,
}) {
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
