import { useEffect, useState } from "react";
import CreatePage from "../../shared/CreatePage";
import { Heading, Image, Span } from "../../ui/component.styled";
import {
  CenterElementContainer,
  PageContainer,
  ProfileContainer,
  ProfileContentContainer,
  ProfileDescriptionContainer,
} from "../../ui/container.styled";
import { getContent } from "../../utils/fetchRequests";

const ProfilePage = () => {
  const [user, setData] = useState("");
  useEffect(() => {
    const getData = async () => {
      const { error, message, data } = await getContent("/api/users/profile");

      if (!error) {
        setData(data);
      }
    };

    getData();
  }, []);

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfileContentContainer>
          {/* Add Image to profile  */}
          <CenterElementContainer>
            <Image src={user.img} />
          </CenterElementContainer>

          {/* add Bio  */}
          <CenterElementContainer>
            <Heading color="#fff" margin="0px">
              {user.name}
            </Heading>
            <p>{user.email}</p>
          </CenterElementContainer>

          {/* Adding profile Description  */}
          <ProfileDescriptionContainer>
            <p>
              {" "}
              <Span>Phone: {user.phone}</Span>
            </p>
            <p>
              <Span>Address: {user.address}</Span>
            </p>
            <p>
              <Span>Registration Number: {user.reg_number}</Span>
            </p>
            <p>
              <Span>License Number: {user.license_number}</Span>
            </p>
          </ProfileDescriptionContainer>
        </ProfileContentContainer>
      </ProfileContainer>
    </PageContainer>
  );
};

function UserProfile() {
  return <CreatePage Page={<ProfilePage />} />;
}

export default UserProfile;
