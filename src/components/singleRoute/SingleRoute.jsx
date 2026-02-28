import { useState } from "react";
import { Container, Grid, Tabs } from "@mui/material";
import { useGetSingleTripQuery } from "../../redux/api/apiSlice";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import {
  CardTravel,
  DirectionsBus,
  MoreVert,
  ArrowRight,
} from "@mui/icons-material";
import { Navigate, useParams } from "react-router-dom";

const SingleRoute = () => {
  const { id } = useParams();
  const { data: trips = [], isLoading: fetching, error } = useGetSingleTripQuery(id);
  
  const [tabNo, setTabNo] = useState(0);

  const tripsHeaders = [
    { label: "Vehicle", key: "number_plate" },
    { label: "Fare (UGX)", key: "tp_fare" },
    { label: "Travel Date", key: "date" },
    { label: "Time", key: "time" },
  ];
  
  const busesHeaders = [
    { label: "PlateNo", key: "number_plate" },
    { label: "Capacity", key: "capacity" },
    { label: "Time", key: "time" },
  ];

  const handleTabChange = (event, newValue) => {
    setTabNo(newValue);
  };

  const accessToken = localStorage.getItem("DPMAccessToken");
  const refreshToken = localStorage.getItem("DPMRefreshToken");
  if (!accessToken || !refreshToken) return <Navigate to="/login" replace />;

  return (
    <Container style={{ paddingTop: "50px" }} maxWidth={false}>
      <Grid
        style={{
          textAlign: "center",
          fontFamily: "verdana",
          fontSize: "30px",
        }}
      >
        {trips[0] ? (
          <div
            style={{
              display: "inline-flex",
            }}
          >
            <div>
              <div
                style={{
                  background: "#FFF",
                  border: "2px solid #A2302F",
                  color: "#A2302F",
                  borderRadius: "10px",
                  padding: "4px",
                }}
              >
                {trips[0] && trips[0].start_point}
              </div>
            </div>
            <MoreVert
              style={{
                display: "inline-flex",
                fontSize: "47px",
                textAlign: "center",
                transform: "rotate(90deg)",
                color: "#A09D96",
              }}
            />
            <MoreVert
              style={{
                display: "inline-flex",
                textAlign: "center",
                fontSize: "47px",
                transform: "rotate(90deg)",
                color: "#A09D96",
              }}
            />
            <MoreVert
              style={{
                display: "inline-flex",
                fontSize: "47px",
                textAlign: "center",
                transform: "rotate(90deg)",
                color: "#A09D96",
              }}
            />
            <MoreVert
              style={{
                display: "inline-flex",
                fontSize: "47px",
                textAlign: "center",
                transform: "rotate(90deg)",
                color: "#A09D96",
              }}
            />
            <ArrowRight
              style={{
                display: "inline-flex",
                fontSize: "47px",
                textAlign: "center",
                color: "#A09D96",
              }}
            />
            <div>
              <div
                style={{
                  background: "#A2302F",
                  border: "2px solid #A2302F",
                  color: "#FFFF",
                  borderRadius: "10px",
                  padding: "4px",
                }}
              >
                {trips[0] && trips[0].destination}
              </div>
            </div>
          </div>
        ) : null}
      </Grid>
      <Tabs
        value={tabNo}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        style={{
          padding: "1px",
          marginLeft: "60px",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        <Tab label="Trips" icon={<CardTravel />} />
        <Tab label="Buses" icon={<DirectionsBus />} />
      </Tabs>
      <TabPanel
        value={tabNo}
        index={0}
        headers={tripsHeaders}
        tableBody={trips}
        fetching={fetching}
      />
      <TabPanel
        value={tabNo}
        index={1}
        headers={busesHeaders}
        tableBody={trips}
        fetching={fetching}
      />
    </Container>
  );
};

export default SingleRoute;
