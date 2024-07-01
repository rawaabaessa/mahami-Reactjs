import { Badge, Button, Modal } from "react-bootstrap";
import { useContext } from "react";
import { TaskContext } from "../contexts/taskContext";
import { useState } from "react";

export default function TaskCard({
  title,
  id,
  category,
  priority,
  startTime,
  endTime,
  date,
  isCompleted,
}) {
  const { tasks, setTasks } = useContext(TaskContext);
  //delete popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //edit popup
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);

  const [EditInput, setEditInput] = useState({
    title: title,
    category: category,
    priority: priority,
    startTime: startTime,
    endTime: endTime,
    date: date,
  });

  const handleCheck = () => {
    const updatedTask = tasks.map((task) => {
      if (task.id == id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTasks(updatedTask);
    localStorage.setItem("todo", JSON.stringify(updatedTask));
  };
  const handleDeleteClick = () => {
    const updatedTasks = tasks.filter((task) => {
      return task.id != id;
    });
    setTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
  };
  const handleEditClick = () => {
    const updatedTask = tasks.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          title: EditInput.title,
          category: EditInput.category,
          priority: EditInput.priority,
          startTime: EditInput.startTime,
          endTime: EditInput.endTime,
          date: EditInput.date,
        };
      } else {
        return task;
      }
    });
    setTasks(updatedTask);
    localStorage.setItem("todo", JSON.stringify(updatedTask));
    handleEditClose();
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
    <div className={`task-card ${isCompleted ? "is-completed" : ""}`}>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-start">
          <button
            className={`checkbox ${
              isCompleted == true ? "is-completed-bg" : ""
            }`}
            onClick={() => {
              handleCheck();
            }}
          ></button>
          <div className="task-content">
            <h5>{title}</h5>
            <p>{category === "personal" ? "شخصي" : "عمل"}</p>
            <div className="task-time">
              <p>
                <strong className="ms-1">
                  {convertTo12HourFormat(startTime).split(" ")[0]}
                </strong>
                {convertTo12HourFormat(startTime).endsWith("AM")
                  ? "صباحا"
                  : "مساء"}
              </p>
              -
              <p>
                <strong className="ms-1">
                  {convertTo12HourFormat(endTime).split(" ")[0]}
                </strong>
                {convertTo12HourFormat(endTime).endsWith("AM")
                  ? "صباحا"
                  : "مساء"}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end justify-content-between">
          <Badge
            className={`task-badge ${
              priority === "1"
                ? "necessary-bg"
                : priority === "2"
                ? "important-bg"
                : "normal-bg"
            }`}
            text="dark"
          >
            {priority === "1" ? "ضروري" : priority === "2" ? "مهم" : "عادي"}
          </Badge>
          <div className="d-flex gap-3 task-mng">
            <button onClick={handleShow}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={handleEditShow}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </div>
      {/* delete popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>اضافة مهمة جديدة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            <p>هل انت متاكد من حذف المهمة</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start gap-2">
          <Button
            className="btn-popup"
            variant="secondary"
            onClick={handleDeleteClick}
          >
            حذف
          </Button>
          <Button
            className="btn-popup-close"
            variant="secondary"
            onClick={handleClose}
          >
            الغاء
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit Popup */}
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header>
          <Modal.Title>اضافة مهمة جديدة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center task-input">
              <i className="fa-solid fa-list-check"></i>
              <input
                type="text"
                value={EditInput.title}
                onChange={(e) => {
                  setEditInput({
                    ...EditInput,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <p className="task-prio mb-0">وقت البداية</p>
                <p className="task-prio mb-0">وقت النهاية</p>
              </div>
              <div className="d-flex justify-content-between">
                <input
                  type="time"
                  className="task-input w-50 outline-none"
                  value={EditInput.startTime}
                  onChange={(e) => {
                    setEditInput({
                      ...EditInput,
                      startTime: e.target.value,
                    });
                  }}
                  required
                />
                <input
                  type="time"
                  className="task-input w-50 outline-none"
                  value={EditInput.endTime}
                  onChange={(e) => {
                    setEditInput({
                      ...EditInput,
                      endTime: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <p className="task-prio mb-0">التاريخ</p>
            <input
              type="date"
              className="task-input"
              value={date}
              onChange={(e) => {
                setEditInput({
                  ...EditInput,
                  date: e.target.value,
                });
              }}
            />
            <p className="task-prio mb-0">الاولوية</p>
            <div className="priorty">
              <input
                type="radio"
                name="priorty"
                id="1"
                checked={EditInput.priority === "1"}
                onChange={(e) => {
                  setEditInput({ ...EditInput, priority: e.target.id });
                }}
              />
              <label htmlFor="1" className="priorty-label">
                ضروري
              </label>
              <input
                type="radio"
                name="priorty"
                id="2"
                checked={EditInput.priority === "2"}
                onChange={(e) => {
                  setEditInput({ ...EditInput, priority: e.target.id });
                }}
              />
              <label htmlFor="2" className="priorty-label">
                مهم
              </label>
              <input
                type="radio"
                name="priorty"
                id="3"
                checked={EditInput.priority === "3"}
                onChange={(e) => {
                  setEditInput({ ...EditInput, priority: e.target.id });
                }}
              />
              <label htmlFor="3" className="priorty-label ">
                عادي
              </label>
            </div>
            <p className="task-cat mb-0">التصنيف</p>
            <div className="category">
              <input
                type="radio"
                name="category"
                id="personal"
                checked={EditInput.category === "personal"}
                onChange={(e) => {
                  setEditInput({ ...EditInput, category: e.target.id });
                }}
              />
              <label htmlFor="personal" className="category-label">
                شخصي
              </label>
              <input
                type="radio"
                name="category"
                id="work"
                checked={EditInput.category === "work"}
                onChange={(e) => {
                  setEditInput({ ...EditInput, category: e.target.id });
                }}
              />
              <label htmlFor="work" className="category-label">
                عمل
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start gap-2">
          {/* <Button>add</Button> */}
          <Button
            className="btn-popup"
            // type="submit"
            variant="secondary"
            onClick={handleEditClick}
          >
            تعديل
          </Button>
          <Button
            className="btn-popup-close"
            variant="secondary"
            onClick={handleEditClose}
          >
            الغاء
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
