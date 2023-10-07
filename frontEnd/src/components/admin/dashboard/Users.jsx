import CreateAdminPage from "../../shared/CreateAdminPage";
import { PageContainer } from "../../ui/container.styled";

const UsersPage = () => {
  return <PageContainer></PageContainer>;
};

function Users() {
  return <CreateAdminPage Page={<UsersPage />} />;
}

export default Users;
