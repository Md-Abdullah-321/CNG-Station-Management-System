import { useEffect, useState } from "react";
import { Line } from "../../ui/component.styled";
import {
  DashboardContainer,
  LeftContainer,
  LineContainer,
  RightContainer,
} from "../../ui/container.styled";

function Dashboard() {
  const [currentSerialHistory, setCurrentSerialHistory] = useState([]);
  const [navbar, setNavbar] = useState(false);

  //GET: get serial history;
  const fetchData = async () => {
    try {
      const res = await fetch("/api/users/serialHistory", {
        credentials: "include",
      });

      const data = await res.json();

      //Handle response:
      if (data) {
        setCurrentSerialHistory(data.payload);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DashboardContainer>
      {/* {hamburger button } */}
      <LineContainer onClick={handleNavbar}>
        <Line /> <Line /> <Line />
      </LineContainer>

      {/* Navbar  */}
      {navbar && <LeftContainer></LeftContainer>}

      <RightContainer width={navbar}></RightContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
