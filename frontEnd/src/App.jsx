import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/admin/dashboard";
import CreateAdmin from "./components/admin/dashboard/CreateAdmin";
import CurrentSerial from "./components/admin/dashboard/CurrentSerial";
import PendingUsers from "./components/admin/dashboard/PendingUsers";
import Users from "./components/admin/dashboard/Users";
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

        {/* Admin Routes  */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/serial" element={<CurrentSerial />} />
        <Route path="/admin/pending" element={<PendingUsers />} />
        <Route path="/admin/create" element={<CreateAdmin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
