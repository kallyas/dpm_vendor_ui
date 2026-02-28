import React, {useState, useEffect, useCallback, useMemo} from "react"
import {Container, Box, Typography} from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"
import {getTrips} from "../../redux/slices/tripsSlice"
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import AddTrip from "./AddTrip"
import moment from "moment"
import {addTrip, updateTrip} from "../../redux/actions/addTripAction"
import {validate} from "./validateTrip"

const headers = [
  {label: "Vehicle", key: "number_plate"},
  {label: "From", key: "start_point"},
  {label: "To", key: "destination"},
  {label: "Fare (UGX)", key: "tp_fare"},
  {label: "Travel Date", key: "date"},
  {label: "Time", key: "time"},
]

const Trips = () => {
  const dispatch = useDispatch()
  const tripsState = useSelector((state) => state.trips)
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [localTrips, setLocalTrips] = useState([])
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [addError, setAddError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    route_id: "",
    vehicle_id: "",
    tp_fare: "",
    setoff_time: "",
  })

  useEffect(() => {
    dispatch(getTrips())
  }, [dispatch])

  useEffect(() => {
    if (tripsState.error) {
      toast.error(tripsState.error.message)
    } else if (tripsState.data) {
      setLocalTrips(tripsState.data)
    }
  }, [tripsState])

  const handleCheck = useCallback(({target}) => {
    const {checked, id} = target
    setLocalTrips((prevTrips) =>
      prevTrips.map((trip) => ({
        ...trip,
        checked: id === "header" ? checked : trip.id === id ? checked : trip.checked,
      }))
    )
  }, [])

  const toggleAdd = useCallback(() => {
    setShowAdd((prev) => !prev)
    setShowUpdate(false)
    setFormData({route_id: "", vehicle_id: "", tp_fare: "", setoff_time: ""})
  }, [])

  const toggleUpdate = useCallback(() => {
    setShowUpdate((prev) => !prev)
    setShowAdd(false)
  }, [])

  const handleChange = async ({target}) => {
    const {name, value} = target
    const error = await validate({...formData, [name]: value})
    setFormData((prev) => ({...prev, [name]: value}))
    setSubmitDisabled(error !== undefined)
    setAddError(error)
  }

  const handleUpdateChange = useCallback(async ({target}) => {
    const {name, value} = target
    setLocalTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.checked ? {...trip, [name]: value} : trip
      )
    )
    const error = await validate({...formData, [name]: value})
    setSubmitDisabled(error !== undefined)
    setAddError(error)
  }, [formData])

  const handleSubmit = async () => {
    const {setoff_time, tp_fare, route_id, vehicle_id} = formData
    const dateTime = moment(setoff_time, "YYYY-MM-DDTHH:mm").format(
      "DD/MM/YYYY HH:mm:ss"
    )
    setSubmitting(true)
    const result = await addTrip({
      setoff_time: dateTime,
      tp_fare,
      route_id,
      vehicle_id,
    })
    setSubmitting(false)
    if (result === true) {
      toggleAdd()
      dispatch(getTrips())
    }
  }

  const handleSubmitUpdate = async () => {
    const checkedTrip = localTrips.find((trip) => trip.checked === true)
    if (!checkedTrip) return
    
    const {id, setoff_time, tp_fare, route_id, vehicle_id} = checkedTrip
    const dateTime = moment(setoff_time, "YYYY-MM-DDTHH:mm").format(
      "DD/MM/YYYY HH:mm:ss"
    )
    setSubmitting(true)
    const result = await updateTrip({
      id,
      setoff_time: dateTime,
      tp_fare,
      route_id,
      vehicle_id,
    })
    setSubmitting(false)
    if (result) {
      toggleUpdate()
      dispatch(getTrips())
    }
  }

  const checkedTrips = useMemo(
    () => localTrips.filter((trip) => trip.checked === true),
    [localTrips]
  )
  const allChecked = localTrips.length > 0 && localTrips.every((trip) => trip.checked === true)
  const oneChecked = checkedTrips.length === 1
  const currentTrip = checkedTrips[0] || {}

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: {xs: 2, sm: 3, md: 4} }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 1,
          }}
        >
          Trips Management
        </Typography>
        <Typography 
          variant="body1" 
          sx={{
            color: "text.secondary",
          }}
        >
          Schedule and manage all your trips efficiently.
        </Typography>
      </Box>

      {showAdd && (
        <AddTrip
          submitting={submitting}
          submitDisabled={submitDisabled}
          error={addError}
          title="Add new Trip"
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          route_id={formData.route_id}
          vehicle_id={formData.vehicle_id}
          tp_fare={formData.tp_fare}
          setoff_time={formData.setoff_time}
          toggleAdd={toggleAdd}
        />
      )}

      {showUpdate && oneChecked && (
        <AddTrip
          submitting={submitting}
          submitDisabled={submitDisabled}
          error={addError}
          title="Update Trip"
          route_id={currentTrip.route_id}
          vehicle_id={currentTrip.vehicle_id}
          tp_fare={currentTrip.tp_fare}
          setoff_time={currentTrip.setoff_time}
          handleChange={handleUpdateChange}
          handleSubmit={handleSubmitUpdate}
          toggleAdd={toggleUpdate}
        />
      )}

      <SharedTable
        fetching={tripsState.loading ? "100%" : "false"}
        oneChecked={oneChecked}
        toggleUpdate={oneChecked && toggleUpdate}
        toggleAdd={toggleAdd}
        handleCheck={handleCheck}
        tableBody={localTrips}
        headers={headers}
        allChecked={allChecked}
      />
    </Container>
  )
}

export default Trips
