import React, {Component} from "react"
import {Container, Grid} from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"
import {getTrips} from "../../redux/actions/getTripsAction"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import AddTrip from "./AddTrip"
import moment from "moment"
import {addTrip, updateTrip} from "../../redux/actions/addTripAction"
import {validate} from "./validateTrip"
// import {} from '@mui/icons-material';

class Trips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: "221%",
      showAdd: false,
      showUpdate: false,
      trips: [],
      submitDisabled: true,
      addError: "",
      submitting: false,
      headers: [
        {label: "Vehicle", key: "number_plate"},
        {label: "From", key: "start_point"},
        {label: "To", key: "destination"},
        {label: "Fare (UGX)", key: "tp_fare"},
        {label: "Travel Date", key: "date"},
        {label: "Time", key: "time"},
      ],
    }
  }

  componentDidMount() {
    const {getTrips} = this.props
    getTrips()
  }

  componentWillReceiveProps(nextProps) {
    const {
      trips: {data, error},
    } = nextProps
    if (error) {
      this.setState({fetching: false})
      toast.error(error.message)
    } else if (data) {
      this.setState({trips: data, fetching: false})
    }
  }

  handleCheck = ({target}) => {
    const {checked, id} = target
    const {trips: stateTrips} = this.state
    const checkedTrips = []
    stateTrips.forEach((trip) => {
      const newTrip = {...trip}
      if (id === "header") {
        newTrip.checked = checked
      }
      if (newTrip.id == id) {
        newTrip.checked = checked
      }
      checkedTrips.push(newTrip)
    })
    this.setState({trips: checkedTrips})
  }

  toggleAdd = () => {
    const {showAdd} = this.state
    this.setState({showAdd: !showAdd})
  }

  toggleUpdate = () => {
    const {showUpdate} = this.state
    this.setState({showUpdate: !showUpdate})
  }

  handleChange = async ({target}) => {
    const {name, value} = target
    const {setoff_time, tp_fare, route_id, vehicle_id} = this.state
    const error = await validate({
      setoff_time,
      tp_fare,
      route_id,
      vehicle_id,
      [name]: value,
    })
    this.setState({
      [name]: value,
      submitDisabled: error !== undefined ? true : false,
      addError: error,
    })
  }

  handleUpdateChange = async ({target}) => {
    const {trips} = this.state
    const {name, value} = target
    let tripIndex
    const updatedtrips = trips.map((trip, index) => {
      const updatedTrip = {...trip}
      if (updatedTrip.checked === true) {
        updatedTrip[name] = value
        tripIndex = index
      }
      return updatedTrip
    })
    const error = await validate({...updatedtrips[tripIndex], [name]: value})
    this.setState({
      trips: updatedtrips,
      submitDisabled: error !== undefined ? true : false,
      updateError: error,
    })
  }

  handleSubmit = async () => {
    const {setoff_time, tp_fare, route_id, vehicle_id} = this.state
    const dateTime = moment(setoff_time, "YYYY-MM-DDTHH:mm").format(
      "DD/MM/YYYY HH:mm:ss"
    )
    this.setState({submitting: true})
    const result = await addTrip({
      setoff_time: dateTime,
      tp_fare,
      route_id,
      vehicle_id,
    })
    this.setState({submitting: false})
    if (result === true) {
      this.toggleAdd()
      this.props.getTrips()
    }
  }

  handleSubmitUpdate = async () => {
    const {trips} = this.state
    const trip = trips.filter((trip) => trip.checked === true)
    const {id, setoff_time, tp_fare, route_id, vehicle_id} = trip[0]
    const dateTime = moment(setoff_time, "YYYY-MM-DDTHH:mm").format(
      "DD/MM/YYYY HH:mm:ss"
    )
    this.setState({submitting: true})
    const result = await updateTrip({
      id,
      setoff_time: dateTime,
      tp_fare,
      route_id,
      vehicle_id,
    })
    this.setState({submitting: false})
    if (result) {
      this.toggleUpdate()
      this.props.getTrips()
    }
  }

  render() {
    const {
      fetching,
      headers,
      trips,
      showAdd,
      route_id,
      vehicle_id,
      tp_fare,
      setoff_time,
      showUpdate,
      addError,
      updateError,
      submitDisabled,
      submitting,
    } = this.state
    const allChecked = trips.every((trip) => trip.checked === true)
    const checkedTrips = trips.filter((trip) => trip.checked === true)
    let {
      tp_fare: tpFare,
      setoff_time: setoffTime,
      vehicle_id: vehicleId,
      route_id: routeId,
    } = checkedTrips[0] ? checkedTrips[0] : [{}]
    const oneChecked = checkedTrips.length === 1
    return (
      <Container style={{paddingTop: "50px"}} maxWidth={false}>
        <Grid
          style={{
            textAlign: "center",
            fontFamily: "verdana",
            fontSize: "30px",
            paddingBottom: "50px",
          }}
        >
          Trips
        </Grid>
        {showAdd ? (
          <AddTrip
            submitting={submitting}
            submitDisabled={submitDisabled}
            error={addError}
            title="Add new Trip"
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            route_id={route_id}
            vehicle_id={vehicle_id}
            tp_fare={tp_fare}
            setoff_time={setoff_time}
            toggleAdd={this.toggleAdd}
          />
        ) : (
          ""
        )}

        {showUpdate && oneChecked ? (
          <AddTrip
            submitting={submitting}
            submitDisabled={submitDisabled}
            error={updateError}
            title="Update Trip"
            route_id={routeId}
            vehicle_id={vehicleId}
            tp_fare={tpFare}
            setoff_time={setoffTime}
            handleChange={this.handleUpdateChange}
            handleSubmit={this.handleSubmitUpdate}
            toggleAdd={this.toggleUpdate}
          />
        ) : (
          ""
        )}
        <SharedTable
          fetching={fetching}
          oneChecked={oneChecked}
          toggleUpdate={oneChecked && this.toggleUpdate}
          toggleAdd={this.toggleAdd}
          handleCheck={this.handleCheck}
          tableBody={trips}
          headers={headers}
          allChecked={allChecked}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({trips}) => {
  return {trips}
}

const mapDispatchToProps = {
  getTrips,
}

export default connect(mapStateToProps, mapDispatchToProps)(Trips)
