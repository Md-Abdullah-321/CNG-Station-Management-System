import CreatePage from "../../shared/CreatePage";
import { PageContainer } from "../../ui/container.styled";

const ProfilePage = () => {
  return (
    <PageContainer>
      <h1>Hello Profile!</h1>
    </PageContainer>
  );
};

function UserProfile() {
  return <CreatePage Page={<ProfilePage />} />;
}

export default UserProfile;
