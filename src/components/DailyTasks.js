import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../assets/css/style.css";

export default function DailyTasks({ noneCompletedTaskCount, taskCount }) {
  let progressPercentage = 0;
  if (taskCount > 0) {
    progressPercentage =
      ((taskCount - noneCompletedTaskCount) / taskCount) * 100;
  }
  return (
    <div className="daily-task flex-column align-items-center justify-content-center">
      <p>الانجاز اليومي</p>
      <div className="progress-container">
        <CircularProgressbarWithChildren
          value={progressPercentage}
          strokeWidth={3}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "#9854cb",
            textColor: "black",
            trailColor: "#acacac",
          })}
        >
          <div className="progress-child">
            <p className="progress-num">{noneCompletedTaskCount}</p>
            <p className="progress-num">متبقي</p>
            <span>من مجموع {taskCount}</span>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
