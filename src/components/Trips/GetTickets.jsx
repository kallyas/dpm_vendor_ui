import React, {useEffect, useState} from "react"
import {getTickets} from "../../redux/slices/ticketsSlice"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {Container, Typography, CircularProgress} from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"

const Get = (props) => {
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
    const {getTickets, match} = props
    getTickets(match.params.id)
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
        <Container maxWidth={false}>
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              paddingTop: noTickets ? 100 : 30,
            }}
          >
            {noTickets ? "No tickets available" : "Tickets"}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            style={{textAlign: "center", paddingTop: 10}}
          >
            {fetching ? (
              <CircularProgress />
            ) : noTickets ? (
              ""
            ) : (
              `Total Capacity: ${totalCapacity}`
            )}
          </Typography>
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
