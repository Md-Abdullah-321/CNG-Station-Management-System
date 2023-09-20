import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/login";
import Dashboard from "./components/users/dashboard";
import Login from "./components/users/login";
import Registration from "./components/users/registration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
