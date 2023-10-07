import CreateAdminPage from "../../shared/CreateAdminPage";
import { PageContainer } from "../../ui/container.styled";

const PendingUserPage = () => {
  return <PageContainer></PageContainer>;
};

function PendingUsers() {
  return <CreateAdminPage Page={<PendingUserPage />} />;
}

export default PendingUsers;
