import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/login";
import Dashboard from "./components/users/dashboard";
import UserProfile from "./components/users/dashboard/profile";
import SerialHistory from "./components/users/dashboard/serialHistory";
import Login from "./components/users/login";
import Registration from "./components/users/registration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/serialHistory" element={<SerialHistory />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
