import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Managment from "./components/Managment";
import Signup from "./components/Signup";
import SnackBar from "./components/SnackBar";
import ProtectedRoutes from "./services/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import { TaskProvider } from "./contexts/taskContext";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route
            path="/dashboard"
            element={
              <TaskProvider>
                <ToastProvider>
                  <Managment />
                </ToastProvider>
              </TaskProvider>
            }
          />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
