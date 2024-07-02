import "../assets/css/style.css";
import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import User from "../assets/img/user.png";
import RemainTasks from "./RemainTasks";
import DailyTasks from "./DailyTasks";
import TaskCard from "./TaskCard";
import { useState, useContext, useEffect } from "react";
import Calendar from "react-calendar";
import todoImg from "../assets/img/to-do-img.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "../contexts/taskContext";

export default function Managment() {
  const userData = useLocation();
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const navigate = useNavigate();
  const userstorage = JSON.parse(localStorage.getItem("user"));
  const user = userstorage.find((user) => user.id === userData.state);
  const { tasks, setTasks } = useContext(TaskContext);
  const [displayTaskType, setDisplayTaskType] = useState("الكل");

  const completedTask = tasks.filter((task) => {
    return task.isCompleted && task.date == date && task.userId == user.id;
  });

  const noneCompletedTask = tasks.filter((task) => {
    return !task.isCompleted && task.date == date && task.userId == user.id;
  });

  let taskToBeRendered = tasks;

  if (displayTaskType == "المكتملة") {
    taskToBeRendered = completedTask;
  } else if (displayTaskType == "غير المكتملة") {
    taskToBeRendered = noneCompletedTask;
  } else {
    taskToBeRendered = tasks.filter((task) => {
      return task.date == date && task.userId == user.id;
    });
  }

  const necessaryTask = tasks.filter((task) => {
    return (
      task.priority === "1" &&
      !task.isCompleted &&
      task.date == date &&
      task.userId == user.id
    );
  });
  const importantTask = tasks.filter((task) => {
    return (
      task.priority === "2" &&
      !task.isCompleted &&
      task.date == date &&
      task.userId == user.id
    );
  });
  const normalTask = tasks.filter((task) => {
    return (
      task.priority === "3" &&
      !task.isCompleted &&
      task.date == date &&
      task.userId == user.id
    );
  });

  let taskCount = tasks.filter((task) => {
    return task.date == date && task.userId == user.id;
  }).length;

  let necessaryTaskCount = necessaryTask.length;
  let importantTaskCount = importantTask.length;
  let normalTaskCount = normalTask.length;
  let noneCompletedTaskCount = noneCompletedTask.length;

  //popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addInput, setAddInput] = useState({
    title: "",
    category: "personal",
    priority: "1",
    startTime: "",
    endTime: "",
    date: new Date().toLocaleDateString(),
  });

  const [search, setSearch] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      title: addInput.title,
      category: addInput.category,
      priority: addInput.priority,
      startTime: addInput.startTime,
      endTime: addInput.endTime,
      userId: user.id,
      date: new Date(addInput.date).toLocaleDateString(),
      isCompleted: false,
    };
    const updatedTask = [...tasks, newTask];
    setTasks(updatedTask);
    localStorage.setItem("todo", JSON.stringify(updatedTask));
    handleClose();
    setAddInput({
      title: "",
      category: "personal",
      priority: "1",
      startTime: "",
      endTime: "",
      date: new Date().toLocaleDateString(),
    });
  };

  useEffect(() => {
    const storageTask = localStorage.getItem("todo");
    if (storageTask) {
      try {
        const storageTodo = JSON.parse(storageTask);
        setTasks(storageTodo);
      } catch (error) {
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }, []);

  let Tasklist = taskToBeRendered
    .filter((task) => {
      return search === "" ? task : task.title.includes(search);
    })
    .map((task) => {
      return (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          priority={task.priority}
          category={task.category}
          startTime={task.startTime}
          endTime={task.endTime}
          date={task.date}
          isCompleted={task.isCompleted}
        />
      );
    });

  const changeDisplayType = (type) => {
    setDisplayTaskType(type);
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <Container fluid className="managment-bg">
      <Row className="m-3 gap-3 media">
        <Col md={3}>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-1 align-items-center">
                <img className="user-img" src={User} alt="" />
                <div>
                  <p className="user-greating">مرحبا بك</p>
                  <h6>{user.name}</h6>
                </div>
              </div>
              <Link to="/">
                <button className="logout" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </Link>
            </div>
            <RemainTasks
              necessaryTaskCount={necessaryTaskCount}
              importantTaskCount={importantTaskCount}
              normalTaskCount={normalTaskCount}
              noneCompletedTaskCount={noneCompletedTaskCount}
            />
            <DailyTasks
              noneCompletedTaskCount={noneCompletedTaskCount}
              taskCount={taskCount}
            />
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-2">
              <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  placeholder="البحث عن المهام"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div className="dropdown">
                <button
                  className="dropdown-btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-sort ms-1"></i>
                  {displayTaskType}
                </button>
                <ul className="dropdown-menu">
                  <li
                    className="text-end"
                    name="type"
                    onClick={() => {
                      changeDisplayType("الكل");
                    }}
                  >
                    <a className="dropdown-item">الكل</a>
                  </li>
                  <li
                    className="text-end"
                    name="type"
                    onClick={() => {
                      changeDisplayType("المكتملة");
                    }}
                  >
                    <a className="dropdown-item">المهام المكتملة</a>
                  </li>
                  <li
                    className="text-end"
                    name="type"
                    onClick={() => {
                      changeDisplayType("غير المكتملة");
                    }}
                  >
                    <a className="dropdown-item">المهام غير المكتملة</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center task-div">
              <h1>
                {date == new Date().toLocaleDateString() ? "اليوم" : date}
              </h1>
              <div className="d-flex gap-2 task-count">
                <p>عدد المهام</p>
                <div>{taskCount}</div>
              </div>
            </div>
            <div className="necessary-task d-flex justify-content-end align-items-center">
              <button onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {Tasklist.length === 0 ? (
              <p className="no-task">لا توجد مهام</p>
            ) : (
              ""
            )}
            <div className="scroll">{Tasklist}</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="d-flex flex-column gap-3">
            <div className="calender-container">
              <Calendar
                locale={"ar"}
                calendarType={"islamic"}
                onClickDay={(e) => {
                  setDate(e.toLocaleDateString());
                }}
                value={date}
              />
            </div>
            <div>
              <img src={todoImg} alt="" width={"100%"} />
            </div>
          </div>
        </Col>
      </Row>
      {/* Add Task Popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>اضافة مهمة جديدة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center task-input">
              <i className="fa-solid fa-list-check ms-3"></i>
              <input
                type="text"
                value={addInput.title}
                onChange={(e) => {
                  setAddInput({
                    ...addInput,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex gap-2">
                <div className="w-50">
                  <p className="task-prio mb-3">وقت البداية</p>
                  <input
                    type="time"
                    className="task-input"
                    value={addInput.startTime}
                    onChange={(e) => {
                      setAddInput({
                        ...addInput,
                        startTime: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-50">
                  <p className="task-prio mb-3">وقت النهاية</p>
                  <input
                    type="time"
                    className="task-input"
                    value={addInput.endTime}
                    onChange={(e) => {
                      setAddInput({
                        ...addInput,
                        endTime: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <p className="task-prio mb-0">التاريخ</p>
            <input
              type="date"
              className="task-input"
              name="date"
              value={addInput.date}
              onChange={(e) => {
                setAddInput({
                  ...addInput,
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
                checked={addInput.priority === "1"}
                onChange={(e) => {
                  setAddInput({ ...addInput, priority: e.target.id });
                }}
              />
              <label htmlFor="1" className="priorty-label">
                ضروري
              </label>
              <input
                type="radio"
                name="priorty"
                id="2"
                checked={addInput.priority === "2"}
                onChange={(e) => {
                  setAddInput({ ...addInput, priority: e.target.id });
                }}
              />
              <label htmlFor="2" className="priorty-label">
                مهم
              </label>
              <input
                type="radio"
                name="priorty"
                id="3"
                checked={addInput.priority === "3"}
                onChange={(e) => {
                  setAddInput({ ...addInput, priority: e.target.id });
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
                checked={addInput.category === "personal"}
                onChange={(e) => {
                  setAddInput({ ...addInput, category: e.target.id });
                }}
              />
              <label htmlFor="personal" className="category-label">
                شخصي
              </label>
              <input
                type="radio"
                name="category"
                id="work"
                checked={addInput.category === "work"}
                onChange={(e) => {
                  setAddInput({ ...addInput, category: e.target.id });
                }}
              />
              <label htmlFor="work" className="category-label">
                عمل
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start gap-2">
          <Button
            className="btn-popup"
            variant="secondary"
            onClick={handleAddTask}
            disabled={
              addInput.title.length === 0 ||
              addInput.startTime === "" ||
              addInput.endTime === ""
            }
          >
            اضافة
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

      <script src={require("bootstrap/dist/js/bootstrap.min.js")}></script>
    </Container>
  );
}
