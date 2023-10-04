import { useEffect, useState } from "react";
import getTimeIn12HourFormat from "../../shared/ConvertTime";
import CreatePage from "../../shared/CreatePage";
import {
  Button,
  Form,
  Heading,
  P,
  Select,
  Span,
} from "../../ui/component.styled";
import {
  FlexColumn,
  PageContainer,
  ProfileContainer,
  ProfileContentContainer,
  Serial,
  SerialContainer,
} from "../../ui/container.styled";

const init = {
  origin: "",
  destination: "",
};
const DashboardPage = () => {
  const [hasReq, setHasReq] = useState(false);
  const [currentSerialHistory, setCurrentSerialHistory] = useState([]);
  const [requestForm, setRequestForm] = useState({ ...init });

  //GET: get serial type:

  const fetchType = async () => {
    try {
      const res = await fetch("/api/users/serialType", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.message) {
        setHasReq(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET: get serial history;
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
    fetchType();
    fetchData();
  }, []);

  const handleClick = (e) => {
    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST: Request for a serial;
    const reqSerial = async () => {
      try {
        const res = await fetch("/api/users/serial", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...requestForm }),
        });

        const data = await res.json();

        //Handle response:
        if (data.success) {
          alert("Serial Requested Successfully.");
          setHasReq(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    reqSerial();
    fetchData();
  };

  return (
    <PageContainer>
      <ProfileContainer justify={hasReq ? "start" : "center"}>
        {hasReq || (
          <ProfileContentContainer width="50%" height="40%" padding="15px">
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Heading color="#fff" margin="0">
                Serial Form
              </Heading>

              <FlexColumn>
                <Select name="origin" onClick={handleClick}>
                  <option value="">Select Source</option>
                  <option value="Maona">Maona</option>
                  <option value="Kaliakair">Kaliakair</option>
                </Select>

                <Select name="destination" onClick={handleClick}>
                  <option value="">Select Destination</option>
                  <option value="Maona">Maona</option>
                  <option value="Kaliakair">Kaliakair</option>
                </Select>
                <Button type="submit"> Request a serial </Button>
              </FlexColumn>
            </Form>
          </ProfileContentContainer>
        )}

        {hasReq && (
          <SerialContainer>
            {currentSerialHistory.map((serial, index) => {
              return (
                <Serial>
                  <Heading color="#fff" text="start" fontWeight="400">
                    <Span>{index < 9 ? "0" + (index + 1) : index + 1}</Span>
                  </Heading>

                  <P color="#fff" font="20px">
                    <Span>Driver Name : </Span>
                    {serial.driver}
                  </P>

                  <P color="#FAF1E4" font="16px">
                    <Span>Registration Number: </Span>
                    {serial.reg_number}
                  </P>

                  <P color="#FAF1E4" font="16px">
                    <Span>License Number: </Span>
                    {serial.license_number}
                  </P>

                  <P color="#FAF1E4" font="16px">
                    <Span>Origin : </Span>
                    {serial.origin}
                  </P>

                  <P color="#FAF1E4" font="16px">
                    <Span>Destination : </Span>
                    {serial.destination}
                  </P>

                  <P color="#FAF1E4" font="16px">
                    <Span>Serial Time: </Span>
                    {getTimeIn12HourFormat(serial.serial_time)}
                  </P>
                </Serial>
              );
            })}
          </SerialContainer>
        )}
      </ProfileContainer>
    </PageContainer>
  );
};

function Dashboard() {
  return <CreatePage Page={<DashboardPage />} />;
}

export default Dashboard;
