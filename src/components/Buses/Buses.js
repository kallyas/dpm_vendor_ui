import React, { Component } from "react";
import { Container, Grid } from "@material-ui/core";
import BusesTable from "../shared/sharedTable/SharedTable";
import { getVehicles } from "../../redux/actions/getVehiclesAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import AddBus from "./AddBus";
import {
  addVehicle,
  updateVehicle,
} from "../../redux/actions/addVehicleAction";
import { createVehiclePayloadValidator } from "./validator";
// import {} from '@material-ui/icons';

class Buses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: "148%",
      buses: [],
      newVehicle: {},
      showAdd: false,
      showUpdate: false,
      submitDisabled: true,
      addError: "",
      updateError: "",
      submitting: false,
      headers: [
        { label: "PlateNo", key: "number_plate" },
        { label: "Capacity", key: "capacity" },
        { label: "Trips", key: "trips" },
      ],
    };
  }

  componentDidMount() {
    const { getVehicles } = this.props;
    getVehicles();
  }

  componentWillReceiveProps(nextProps) {
    const {
      vehicles: { error, data },
    } = nextProps;
    if (data) {
      this.setState({ buses: data, fetching: false });
    } else {
      this.setState({ fetching: false });
      toast.error(error.message);
    }
  }

  handleCheck = ({ target }) => {
    const { checked, id } = target;
    const { buses } = this.state;
    const checkedBuses = buses.map((bus) => {
      const checkedBus = { ...bus };
      if (id === "header") {
        checkedBus.checked = checked;
      }
      if (checkedBus.id == id) {
        checkedBus.checked = checked;
      }
      return checkedBus;
    });

    this.setState({ buses: checkedBuses });
  };

  toggleAdd = () => {
    const { showAdd } = this.state;
    this.setState({ showAdd: !showAdd });
  };

  toggleUpdate = () => {
    const { showUpdate } = this.state;
    this.setState({ showUpdate: !showUpdate });
  };

  handleChange = async ({ target }) => {
    const { name, value } = target;
    const { number_plate, capacity } = this.state;
    const error = await createVehiclePayloadValidator({
      number_plate,
      capacity,
      [name]: value,
    });
    this.setState({
      [name]: value,
      submitDisabled: error !== undefined ? true : false,
      addError: error,
    });
  };

  handleUpdateChange = async ({ target }) => {
    const { buses } = this.state;
    const { name, value } = target;
    let busIndex;
    const updatedvehicles = buses.map((bus, index) => {
      const updatedBus = { ...bus };
      if (updatedBus.checked === true) {
        busIndex = index;
        updatedBus[name] = value;
      }
      return updatedBus;
    });
    const error = await createVehiclePayloadValidator({
      number_plate: updatedvehicles[busIndex].number_plate,
      capacity: updatedvehicles[busIndex].capacity,
      [name]: value,
    });
    this.setState({
      buses: updatedvehicles,
      submitDisabled: error !== undefined ? true : false,
      updateError: error,
    });
  };

  handleSubmit = async () => {
    const { number_plate, capacity } = this.state;
    this.setState({ submitting: true });
    const result = await addVehicle({ number_plate, capacity });
    if (result) {
      this.toggleAdd();
      this.props.getVehicles();
    }
    this.setState({ submitting: false });
  };

  handleSubmitUpdate = async () => {
    const { buses } = this.state;
    const bus = buses.filter((bus) => bus.checked === true);
    const { id, number_plate, capacity } = bus[0];
    this.setState({ submitting: true });
    const result = await updateVehicle({ id, number_plate, capacity });
    if (result) {
      this.toggleUpdate();
      this.props.getVehicles();
    }
    this.setState({ submitting: false });
  };

  render() {
    const {
      headers,
      submitting,
      buses,
      showAdd,
      showUpdate,
      number_plate,
      capacity,
      submitDisabled,
      addError,
      updateError,
      fetching,
    } = this.state;
    // make trips in each bus the length of the trips array
    buses.forEach((bus) => {
        bus.trips = bus?.trips?.length;
    })
    const allChecked = buses.every((bus) => bus.checked === true);
    const checkedBuses = buses.filter((bus) => bus.checked === true);
    const { capacity: busCapacity, number_plate: numberPlate } = checkedBuses[0]
      ? checkedBuses[0]
      : [{}];
    const oneChecked = checkedBuses.length === 1;
    return (
      <Container style={{ paddingTop: "50px" }} maxWidth={false}>
        <Grid
          style={{
            textAlign: "center",
            fontFamily: "verdana",
            fontSize: "30px",
            paddingBottom: "50px",
          }}
        >
          Vehicles
        </Grid>
        {showAdd ? (
          <AddBus
            submitting={submitting}
            error={addError}
            submitDisabled={submitDisabled}
            title="Add New Vehicle"
            number_plate={number_plate}
            capacity={capacity}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            toggleAdd={this.toggleAdd}
          />
        ) : (
          ""
        )}
        {showUpdate && oneChecked ? (
          <AddBus
            submitting={submitting}
            error={updateError}
            title="Update Vehicle"
            number_plate={numberPlate}
            capacity={busCapacity}
            handleChange={this.handleUpdateChange}
            handleSubmit={this.handleSubmitUpdate}
            toggleAdd={this.toggleUpdate}
          />
        ) : (
          ""
        )}

        <BusesTable
          fetching={fetching}
          oneChecked={oneChecked}
          toggleUpdate={oneChecked && this.toggleUpdate}
          toggleAdd={this.toggleAdd}
          handleCheck={this.handleCheck}
          tableBody={buses}
          headers={headers}
          allChecked={allChecked}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ vehicles }) => {
  return { vehicles };
};

const mapDispatchToprops = {
  getVehicles,
};

export default connect(mapStateToProps, mapDispatchToprops)(Buses);
