import React, {useEffect, useState} from "react"
import {getTickets} from "../../redux/slices/ticketsSlice"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {Container, Box, Typography, CircularProgress, Chip} from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"
import {useParams} from "react-router-dom"

const Get = (props) => {
  const params = useParams()
  const [tickets, setTicktes] = useState([])
  const [totalCapacity, setTotalCapacity] = useState(null)
  const [noTickets, setNoTicktes] = useState(false)
  const [fetching, setFetching] = useState("156.5%")
  const headers = [
    {label: "Ticket No", key: "ticket_number"},
    {label: "From", key: "start_point"},
    {label: "To", key: "destination"},
    {label: "Phone No", key: "phone_number"},
    {label: "Capacity", key: "ticket_capacity"},
    {label: "Created Date", key: "date"},
    {label: "Created Time", key: "bookedTime"},
    {label: "Status", key: "status_name"},
  ]

  useEffect(() => {
    const {getTickets} = props
    getTickets(params.id)
  }, [])
  useEffect(() => {
    const {tickets} = props
    if (tickets.error) {
      setFetching(false)
      toast.error(tickets.error.message)
    } else {
      setFetching(false)
      setTicktes(tickets.data)
      if (tickets.data && tickets.data.length === 0) {
        setNoTicktes(true)
      }
      if (tickets.data && tickets.data.length !== 0) {
        const capacitiesArray = tickets.data.map((ticket) => {
          const {ticket_capacity} = ticket

          return {
            ticket_capacity,
          }
        })

        const valueArray = capacitiesArray.map((capacity) => {
          const {ticket_capacity} = capacity
          return ticket_capacity
        })

        const sum = valueArray.reduce((a, b) => {
          return a + b
        }, 0)

        setTotalCapacity(sum)
      }
    }
  }, [props.tickets])
  return (
    <>
      {tickets && (
        <Container maxWidth="lg" sx={{ py: 4, px: {xs: 2, sm: 3, md: 4} }}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 1,
                textAlign: "center",
              }}
            >
              {noTickets ? "No Tickets Available" : "Trip Tickets"}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              {noTickets ? "There are no tickets booked for this trip yet." : "View all booked tickets for this trip."}
            </Typography>
            {!noTickets && !fetching && totalCapacity && (
              <Chip 
                label={`Total Capacity: ${totalCapacity}`}
                sx={{
                  mt: 2,
                  backgroundColor: "#A2302F",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "20px 10px",
                }}
              />
            )}
            {fetching && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress sx={{ color: "#A2302F" }} />
              </Box>
            )}
          </Box>
          {!noTickets ? (
            <SharedTable
              fetching={fetching}
              hideDock={true}
              tableBody={tickets}
              headers={headers}
              // handleCheck={this.handleCheck}
              // allChecked={allChecked}
            />
          ) : (
            ""
          )}
        </Container>
      )}
    </>
  )
}

const mapStateToProps = ({tickets}) => {
  return {tickets}
}

const mapDispatchToProps = {
  getTickets,
}

export default connect(mapStateToProps, mapDispatchToProps)(Get)
