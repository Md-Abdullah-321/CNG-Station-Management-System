import CreatePage from "../../shared/CreatePage";
import { PageContainer } from "../../ui/container.styled";

const SerialHistoryPage = () => {
  return (
    <PageContainer>
      <h1>Hello Serial!</h1>
    </PageContainer>
  );
};

function SerialHistory() {
  return <CreatePage Page={<SerialHistoryPage />} />;
}

export default SerialHistory;
