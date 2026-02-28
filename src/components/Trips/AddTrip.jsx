import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Input,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { useGetVehiclesQuery, useGetRoutesQuery } from "../../redux/api/apiSlice";
import { toast } from "react-toastify";

const AddTrip = ({
  toggleAdd,
  route_id,
  vehicle_id,
  tp_fare,
  setoff_time,
  handleChange,
  handleSubmit,
  title,
  error,
  submitDisabled,
  submitting,
}) => {
  const { data: vehicles = [], error: vehiclesError } = useGetVehiclesQuery();
  const { data: routes = [], error: routesError } = useGetRoutesQuery();
  
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    if (vehiclesError) {
      toast.error(vehiclesError.message);
    }
    if (routesError) {
      toast.error(routesError.message);
    }
  }, [vehiclesError, routesError]);

  useEffect(() => {
    const operationArea = localStorage.getItem("OperationArea");
    const filtered = routes.filter(
      (route) => route?.route_region?.toLowerCase() === operationArea?.toLowerCase()
    );
    setFilteredRoutes(filtered);
  }, [routes]);

  return (
    <Paper
      style={{
        width: "100vw",
        height: "100vh",
        padding: "0px",
        outline: "0px",
        position: "absolute",
        margin: "0px",
        left: "0px",
        background: "rgba(146, 146, 146, 0.54)",
        right: "0px",
        zIndex: "100",
      }}
    >
      <Grid
        style={{
          padding: "5px 0px",
          borderRadius: "5px",
          width: "40%",
          background: "#F6F8FA",
          margin: "10% auto 0px auto",
        }}
      >
        <Tooltip title={error || ''} open={!!error}>
          <Grid
            style={{
              color: "#A2302F",
              margin: "30px auto 0px auto",
              textAlign: "center",
              fontFamily: "verdana",
              fontSize: "20px",
            }}
          >
            {title}
          </Grid>
        </Tooltip>
        <Grid
          style={{
            width: "90%",
            padding: "25px 30px",
            display: "flex",
            margin: "auto",
            justifyContent: "space-between",
          }}
        >
          <FormControl style={{ width: "45%" }}>
            <InputLabel id="route-select-label">Route</InputLabel>
            <Select
              onChange={handleChange}
              labelId="route-select-label"
              id="route-select-label"
              value={route_id}
              name="route_id"
            >
              {filteredRoutes &&
                filteredRoutes.map((route) => (
                  <MenuItem key={route.id} value={route.id}>{route.route_code}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "45%" }}>
            <InputLabel htmlFor="tp-fare">Fare (UGX)</InputLabel>
            <Input
              name="tp_fare"
              value={tp_fare}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1 } }}
              type="number"
              id="tp-fare"
            />
          </FormControl>
        </Grid>
        <Grid
          style={{
            width: "90%",
            padding: "25px 30px",
            display: "flex",
            margin: "auto",
            justifyContent: "space-between",
          }}
        >
          <FormControl style={{ width: "45%" }}>
            <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
            <Select
              onChange={handleChange}
              labelId="vehicle-select-label"
              id="vehicle-select-label"
              value={vehicle_id}
              name="vehicle_id"
            >
              {vehicles &&
                vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.number_plate}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: "45%" }}>
            <InputLabel id="time-select-label">SetOff Time</InputLabel>
            <Input
              id="time-select-label"
              onChange={handleChange}
              name="setoff_time"
              label="Setoff Time"
              type="datetime-local"
              value={setoff_time}
            />
          </FormControl>
        </Grid>
        <Grid
          style={{
            width: "90%",
            padding: "10px 5px",
            display: "flex",
            margin: "auto",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={toggleAdd}
            style={{ padding: "5px 35px", display: "block", margin: "0px" }}
            size="medium"
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitDisabled}
            style={{ padding: "5px 35px", display: "block", margin: "0px" }}
            size="medium"
            variant="contained"
            color="primary"
          >
            {submitting ? (
              <CircularProgress size={20} color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTrip;
