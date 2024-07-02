import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Managment from "./components/Managment";
import Signup from "./components/Signup";
import ProtectedRoutes from "./services/ProtectedRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskContext } from "./contexts/taskContext";
import { useState } from "react";
import { Tasks } from "./data/Tasks";

function App() {
  const [tasks, setTasks] = useState(Tasks);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route
            path="/dashboard"
            element={
              <TaskContext.Provider value={{ tasks, setTasks }}>
                <Managment />
              </TaskContext.Provider>
            }
          />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
