import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../assets/css/style.css";

export default function DailyTasks() {
  return (
    <div className="daily-task flex-column align-items-center justify-content-center">
      <p>الانجاز اليومي</p>
      <div className="progress-container">
        <CircularProgressbarWithChildren
          value={80}
          strokeWidth={3}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "#9854cb",
            textColor: "black",
            trailColor: "#acacac",
          })}
        >
          <div className="progress-child">
            <p className="progress-num">8</p>
            <p className="progress-num">متبقي</p>
            <span>من مجموع 9</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
