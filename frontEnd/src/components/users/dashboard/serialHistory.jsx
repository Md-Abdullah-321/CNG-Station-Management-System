import { useEffect, useState } from "react";
import CreatePage from "../../shared/CreatePage";
import { PageContainer } from "../../ui/container.styled";
import { getContent } from "../../utils/fetchRequests";

const SerialHistoryPage = () => {
  const [userSerial, setUserSerial] = useState([]);

  useEffect(() => {
    const getSerial = async () => {
      const { error, message, data } = await getContent(
        "/api/users/userHistory"
      );

      if (!error) {
        setUserSerial(data);
      }
    };

    getSerial();
  }, []);

  userSerial.map((date, index) => {
    console.log(Object.keys(date)[0]);

    let obj = Object.values(date)[0];
    let item = Object.keys(obj);

    item.map((value, inx) => {
      console.log(obj[value].driver);
    });
  });
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
