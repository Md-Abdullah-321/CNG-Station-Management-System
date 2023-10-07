import CreateAdminPage from "../../shared/CreateAdminPage";
import { PageContainer } from "../../ui/container.styled";

const SerialPage = () => {
  return <PageContainer></PageContainer>;
};

function CurrentSerial() {
  return <CreateAdminPage Page={<SerialPage />} />;
}

export default CurrentSerial;
