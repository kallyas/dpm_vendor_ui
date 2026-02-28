import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import BusesTable from "../shared/sharedTable/SharedTable";
import { useGetVehiclesQuery, useAddVehicleMutation, useUpdateVehicleMutation } from "../../redux/api/apiSlice";
import AddBus from "./AddBus";
import { createVehiclePayloadValidator } from "./validator";

const Buses = () => {
  const { data: buses = [], isLoading: fetching } = useGetVehiclesQuery();
  const [addVehicle] = useAddVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [addError, setAddError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    number_plate: '',
    capacity: null
  });

  const headers = [
    { label: "PlateNo", key: "number_plate" },
    { label: "Capacity", key: "capacity" },
    { label: "Trips", key: "trips" },
  ];

  const handleCheck = ({ target }) => {
    const { checked, id } = target;
  };

  const toggleAdd = () => {
    setShowAdd((prev) => !prev);
    setFormData({ number_plate: '', capacity: null });
    setSubmitDisabled(true);
    setAddError("");
  };

  const toggleUpdate = () => {
    setShowUpdate((prev) => !prev);
    setUpdateError("");
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    const validationError = await createVehiclePayloadValidator(newFormData);
    setSubmitDisabled(!!validationError);
    setAddError(validationError);
  };

  const handleUpdateChange = async (e) => {
    const { name, value } = e.target;
  };

  const handleSubmit = async () => {
    const { number_plate, capacity } = formData;
    setSubmitting(true);
    try {
      await addVehicle({ number_plate, capacity }).unwrap();
      toggleAdd();
    } catch (err) {
      setAddError(err?.data?.message || 'Failed to add vehicle');
    }
    setSubmitting(false);
  };

  const handleSubmitUpdate = async () => {
    const bus = buses.filter((bus) => bus.checked === true);
    const { id, number_plate, capacity } = bus[0];
    setSubmitting(true);
    try {
      await updateVehicle({ id, number_plate, capacity }).unwrap();
      toggleUpdate();
    } catch (err) {
      setUpdateError(err?.data?.message || 'Failed to update vehicle');
    }
    setSubmitting(false);
  };

  const busesWithTripCount = buses.map((bus) => ({
    ...bus,
    trips: bus?.trips?.length || 0
  }));
  
  const allChecked = false;
  const checkedBuses = busesWithTripCount.filter((bus) => bus.checked === true);
  const { capacity: busCapacity, number_plate: numberPlate } = checkedBuses[0] || {};
  const oneChecked = checkedBuses.length === 1;

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#A2302F",
            mb: 1,
          }}
        >
          Vehicles Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
          }}
        >
          Manage and monitor all vehicles in your fleet.
        </Typography>
      </Box>
      {showAdd ? (
        <AddBus
          submitting={submitting}
          error={addError}
          submitDisabled={submitDisabled}
          title="Add New Vehicle"
          number_plate={formData.number_plate}
          capacity={formData.capacity}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          toggleAdd={toggleAdd}
        />
      ) : null}
      {showUpdate && oneChecked ? (
        <AddBus
          submitting={submitting}
          error={updateError}
          title="Update Vehicle"
          number_plate={numberPlate}
          capacity={busCapacity}
          handleChange={handleUpdateChange}
          handleSubmit={handleSubmitUpdate}
          toggleAdd={toggleUpdate}
        />
      ) : null}

      <BusesTable
        fetching={fetching}
        oneChecked={oneChecked}
        toggleUpdate={oneChecked && toggleUpdate}
        toggleAdd={toggleAdd}
        handleCheck={handleCheck}
        tableBody={busesWithTripCount}
        headers={headers}
        allChecked={allChecked}
      />
    </Container>
  );
};

export default Buses;
