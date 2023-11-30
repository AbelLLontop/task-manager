import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/UserContext";
import ProtectedRouter from "./pages/ProtectedRouter";
import ListTaskPage from "./pages/ListTask";
import PrivateLayout from "./pages/layout/PrivateLayout";
import TaskFormPage from "./pages/TaskFormPage";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRouter />}>
              <Route element={<PrivateLayout />}>
                <Route path="/tasks" element={<ListTaskPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/task/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile Page</h1>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};
export default App;
