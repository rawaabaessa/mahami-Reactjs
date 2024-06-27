import "../assets/css/style.css";
import { Col, Row, Dropdown, Container, Button, Modal } from "react-bootstrap";
import User from "../assets/img/user (2).png";
import RemainTasks from "./RemainTasks";
import DailyTasks from "./DailyTasks";
import TaskCard from "./TaskCard";
import Calender from "react-simple-calender";
import { useState } from "react";
// import "../assets/js/dropdown.js";

export default function Managment() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="managment-bg">
      <Row className="m-3">
        <Col md={3}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-1 align-items-center">
              <img className="user-img" src={User} alt="" />
              <div>
                <p className="user-greating">مرحبا بك</p>
                <h6>روعة</h6>
              </div>
            </div>
            <button className="logout">
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
          <RemainTasks />
          <DailyTasks />
        </Col>
        <Col className="">
          <div className="d-flex gap-2">
            <div className="search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="البحث عن المهام" />
            </div>
            <div className="dropdown">
              <div className="select">
                <span className="selected">الكل</span>
                <div className="caret"></div>
              </div>
              <ul className="menu">
                <li className="active">الكل</li>
                <li>المهام المكتملة</li>
                <li>المهام غير المكتملة</li>
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
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <TaskCard />
          <div className="necessary-task d-flex justify-content-between align-items-center">
            <p>المهام المهمة (2)</p>
            <button>
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <TaskCard />
          <div className="necessary-task d-flex justify-content-between align-items-center">
            <p>المهام العادية (2)</p>
            <button>
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <TaskCard />
        </Col>
        <Col md={3}>
          <Calender
            preselectedDates={["2024-03-20", "2024-03-23"]}
            disabledDates={["2024-03-28", "2024-03-29", "2024-04-2"]}
            multiselect={false}
            onChange={(params) => {
              setDate(params.date);
              console.log(JSON.stringify(params));
            }}
            titleFormat={"MMMM YYYY"}
            daysFormat={2}
          />
        </Col>
      </Row>
      {/* Add Task Popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>اضافة مهمة جديدة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center task-input">
            <i class="fa-solid fa-list-check"></i>
            <input type="text" placeholder="تصميم تطبيق جديد" />
          </div>
          <p className="task-prio">الاولوية</p>
          <div className="priorty">
            <input type="radio" name="priorty" id="1" />
            <label for="1" className="priorty-label">
              ضروري
            </label>
            <input type="radio" name="priorty" id="2" />
            <label for="2" className="priorty-label">
              مهم
            </label>
            <input type="radio" name="priorty" id="3" />
            <label for="3" className="priorty-label">
              عادي
            </label>
          </div>
          <p className="task-cat">التصنيف</p>
          <div className="category">
            <input type="radio" name="category" id="personal" />
            <label for="personal" className="category-label">
              شخصي
            </label>
            <input type="radio" name="category" id="work" />
            <label for="work" className="category-label">
              عمل
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start gap-2">
          <Button className="btn-popup" variant="primary" onClick={handleClose}>
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
    </Container>
  );
}
