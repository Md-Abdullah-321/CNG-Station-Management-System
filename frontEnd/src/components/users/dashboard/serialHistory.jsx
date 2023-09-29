import { useEffect, useState } from "react";
import CreatePage from "../../shared/CreatePage";
import { SerialComponent, SerialDate, Span } from "../../ui/component.styled";
import {
  PageContainer,
  SerialHistoryContainer,
} from "../../ui/container.styled";
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

  const sortSerial = () => {
    let serialObj = {};
    userSerial.map((date, index) => {
      if (!serialObj[Object.keys(date)[0]]) {
        serialObj[Object.keys(date)[0]] = [];
      }
      Object.keys(Object.values(date)[0]).map((value, inx) => {
        serialObj[Object.keys(date)[0]].push(Object.values(date)[0][value]);
      });
    });

    return serialObj;
  };

  return (
    <PageContainer>
      {Object.keys(sortSerial()).map((value, index) => (
        <div>
          <SerialDate>{value}</SerialDate>
          <SerialHistoryContainer>
            {sortSerial()[value].map((serial, inx) => (
              <SerialComponent>
                <p>
                  <Span>Origin: </Span>
                  {serial.origin}
                </p>
                <p>
                  <Span>Destination: </Span>
                  {serial.destination}
                </p>
                <p>
                  <Span>Serial Time: </Span>
                  {serial.serial_time}
                </p>
                <p>
                  <Span>Serial Status: </Span>
                  {serial.serial_status}
                </p>
                <p>
                  <Span>Start: </Span>
                  {serial.start}
                </p>
                <p>
                  <Span>End: </Span>
                  {serial.end}
                </p>
              </SerialComponent>
            ))}
          </SerialHistoryContainer>
        </div>
      ))}
    </PageContainer>
  );
};

function SerialHistory() {
  return <CreatePage Page={<SerialHistoryPage />} />;
}

export default SerialHistory;
