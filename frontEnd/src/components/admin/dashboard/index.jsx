import CreateAdminPage from "../../shared/CreateAdminPage";
import { PageContainer } from "../../ui/container.styled";

const DashboardPage = () => {
  return <PageContainer></PageContainer>;
};

function AdminDashboard() {
  return <CreateAdminPage Page={<DashboardPage />} />;
}

export default AdminDashboard;
