import "../assets/css/style.css";
import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import User from "../assets/img/user (2).png";
import RemainTasks from "./RemainTasks";
import DailyTasks from "./DailyTasks";
import TaskCard from "./TaskCard";
import { useState } from "react";
import Calendar from "react-calendar";
import todoImg from "../assets/img/to-do-img.svg";
import { Link } from "react-router-dom";
import { Tasks } from "../data/Tasks";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Managment() {
  // const { username } = useParams();
  //calender
  const [value, onChange] = useState(new Date());
  //popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //task state
  const [tasks, setTasks] = useState(Tasks);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      title: title,
      category: "عمل",
      priority: "ضروري",
      startTime: "5:30 AM",
      endTime: "6:30 PM",
      userId: 1,
      date: new Date(),
      isCompleted: false,
    };
    setTasks([...Tasks, newTask]);
  };
  // function handleAddTask() {

  // }

  let Tasklist = Tasks.map((task) => {
    return (
      <TaskCard
        key={task.id}
        title={task.title}
        category={task.category}
        priority={task.priority}
        startTime={task.startTime}
        endTime={task.endTime}
      />
    );
  });

  return (
    <Container fluid className="managment-bg">
      <Row className="m-3 gap-3">
        <Col md={3}>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-1 align-items-center">
                <img className="user-img" src={User} alt="" />
                <div>
                  <p className="user-greating">مرحبا بك</p>
                  <h6>روعة</h6>
                </div>
              </div>
              <Link to="/">
                <button
                  className="logout"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-title="تسجيل الخروج"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </Link>
            </div>
            <RemainTasks />
            <DailyTasks />
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
                  <i className="fa-solid fa-sort ms-1"></i>تصفية
                </button>
                <ul className="dropdown-menu">
                  <li className="text-end">
                    <a className="dropdown-item" href="#">
                      الكل
                    </a>
                  </li>
                  <li className="text-end">
                    <a className="dropdown-item" href="#">
                      المهام المكتملة
                    </a>
                  </li>
                  <li className="text-end">
                    <a className="dropdown-item" href="#">
                      المهام غير المكتملة
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center task-div">
              <h1>اليوم</h1>
              <div className="d-flex gap-2 task-count">
                <p>عدد المهام</p>
                <div>8</div>
              </div>
            </div>
            <div className="necessary-task d-flex justify-content-between align-items-center">
              <p>المهام الضرورية (2)</p>
              <button onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {Tasklist}
            <div className="necessary-task d-flex justify-content-between align-items-center">
              <p>المهام المهمة (2)</p>
              <button>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <TaskCard />
            <div className="necessary-task d-flex justify-content-between align-items-center">
              <p>المهام العادية (2)</p>
              <button>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <TaskCard />
          </div>
        </Col>
        <Col md={3}>
          <div className="d-flex flex-column gap-3">
            <div className="calender-container">
              <Calendar onChange={onChange} value={value} />
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
              <i className="fa-solid fa-list-check"></i>
              <input
                type="text"
                // placeholder="تصميم تطبيق جديد"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <p className="task-prio mb-0">الاولوية</p>
            <div className="priorty">
              <input type="radio" name="priorty" id="1" />
              <label htmlFor="1" className="priorty-label">
                ضروري
              </label>
              <input type="radio" name="priorty" id="2" />
              <label htmlFor="2" className="priorty-label">
                مهم
              </label>
              <input type="radio" name="priorty" id="3" />
              <label htmlFor="3" className="priorty-label ">
                عادي
              </label>
            </div>
            <p className="task-cat mb-0">التصنيف</p>
            <div className="category">
              <input type="radio" name="category" id="personal" />
              <label htmlFor="personal" className="category-label">
                شخصي
              </label>
              <input type="radio" name="category" id="work" />
              <label htmlFor="work" className="category-label">
                عمل
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start gap-2">
          {/* <button >
            اضافة
          </button> */}
          <Button
            className="btn-popup"
            // type="submit"
            variant="secondary"
            onClick={handleAddTask}
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
