import { useEffect } from "react";
import CreatePage from "../../shared/CreatePage";
import { PageContainer } from "../../ui/container.styled";

const DashboardPage = () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer>
      <h1>Hello World!</h1>
    </PageContainer>
  );
};

function Dashboard() {
  return <CreatePage Page={<DashboardPage />} />;
}

export default Dashboard;
