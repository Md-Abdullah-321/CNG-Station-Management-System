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

function CreateAdminPage({ Page }) {
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
            <LI name="Dashboard" directory="/admin" />
            <LI name="Users" directory="/admin/users" />
            <LI name="Serial" directory="/admin/serial" />
            <LI name="Pending User" directory="/admin/pending" />
            <LI name="Create New Admin" directory="/admin/create" />
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

export default CreateAdminPage;
