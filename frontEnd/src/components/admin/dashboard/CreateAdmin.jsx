import CreateAdminPage from "../../shared/CreateAdminPage";
import { PageContainer } from "../../ui/container.styled";

const AdminCreatePage = () => {
  return <PageContainer></PageContainer>;
};

function CreateAdmin() {
  return <CreateAdminPage Page={<AdminCreatePage />} />;
}

export default CreateAdmin;
