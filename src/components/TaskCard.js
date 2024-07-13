import { Badge } from "react-bootstrap";
import { useContext } from "react";
import { TaskContext } from "../contexts/taskContext";
import { ToastContext } from "../contexts/ToastContext";

export default function TaskCard({ showDelete, showEdit, todo }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const { showHideToast } = useContext(ToastContext);

  const handleCheck = () => {
    const updatedTask = tasks.map((task) => {
      if (task.id == todo.id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTasks(updatedTask);
    localStorage.setItem("todo", JSON.stringify(updatedTask));
    showHideToast("تم التعديل بنجاح");
  };

  const handleDeleteClick = () => {
    showDelete(todo);
  };

  const handleEditClick = () => {
    showEdit(todo);
  };

  function convertTo12HourFormat(time24) {
    let [hours, minutes] = time24.split(":");
    let period = "AM";

    if (parseInt(hours) >= 12) {
      period = "PM";
    }

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) === 0) {
      hours = "12";
    }

    return `${hours}:${minutes} ${period}`;
  }
  return (
    <div className={`task-card ${todo.isCompleted ? "is-completed" : ""}`}>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-start">
          <button
            className={`checkbox ${
              todo.isCompleted == true ? "is-completed-bg" : ""
            }`}
            onClick={() => {
              handleCheck();
            }}
          ></button>
          <div className="task-content">
            <h5>{todo.title}</h5>
            <p>{todo.category === "personal" ? "شخصي" : "عمل"}</p>
            <div className="task-time">
              <p>
                <strong className="ms-1">
                  {convertTo12HourFormat(todo.startTime).split(" ")[0]}
                </strong>
                {convertTo12HourFormat(todo.startTime).endsWith("AM")
                  ? "صباحا"
                  : "مساء"}
              </p>
              -
              <p>
                <strong className="ms-1">
                  {convertTo12HourFormat(todo.endTime).split(" ")[0]}
                </strong>
                {convertTo12HourFormat(todo.endTime).endsWith("AM")
                  ? "صباحا"
                  : "مساء"}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end justify-content-between">
          <Badge
            className={`task-badge ${
              todo.priority === "1"
                ? "necessary-bg"
                : todo.priority === "2"
                ? "important-bg"
                : "normal-bg"
            }`}
            text="dark"
          >
            {todo.priority === "1"
              ? "ضروري"
              : todo.priority === "2"
              ? "مهم"
              : "عادي"}
          </Badge>
          <div className="d-flex gap-3 task-mng">
            <button onClick={handleDeleteClick}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={handleEditClick}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
