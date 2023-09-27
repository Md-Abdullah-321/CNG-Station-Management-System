import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LI from "../shared/Navbar";
import { Button, Line, Ul } from "../ui/component.styled";
import {
  DashboardContainer,
  LeftContainer,
  LineContainer,
  RightContainer,
} from "../ui/container.styled";

function CreatePage({ Page }) {
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();

  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  //Logout user:
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <DashboardContainer>
      {/* {hamburger button } */}
      <LineContainer onClick={handleNavbar}>
        <Line /> <Line /> <Line />
      </LineContainer>

      {/* Navbar  */}
      {navbar && (
        <LeftContainer>
          <Ul>
            <LI name="Dashboard" directory="/" />
            <LI name="Profile" directory="/user/profile" />
            <LI name="Serial History" directory="/user/serialHistory" />
          </Ul>
          <Button
            margin="0px 0px 50px 0px"
            padding="7px 10px"
            radius="0px"
            onClick={handleClick}
          >
            Logout
          </Button>
        </LeftContainer>
      )}

      <RightContainer width={navbar}>{Page}</RightContainer>
    </DashboardContainer>
  );
}

export default CreatePage;
