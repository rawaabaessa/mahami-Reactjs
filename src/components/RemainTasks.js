import "../assets/css/style.css";
import toDo from "../assets/img/to-do.svg";

export default function RemainTasks() {
  return (
    <div className="remain-tasks">
      <img className="toDo-img" src={toDo} alt="" />
      <div className="d-flex flex-column">
        <p className="task-num-all">
          لديك <span>8</span> مهام متبقية اليوم
        </p>
        <div className="d-flex gap-1">
          <p className="task-num necessary">2</p>
          <p className="necessary">ضروري</p>
        </div>
        <div className="d-flex gap-1">
          <p className="task-num important">2</p>
          <p className="important">مهم</p>
        </div>
        <div className="d-flex gap-1">
          <p className="task-num normal">2</p>
          <p className="normal">عادي</p>
        </div>
      </div>
    </div>
  );
}
