import { useMemo } from "react"
import { useGetTicketsQuery } from "../../redux/api/apiSlice"
import { Container, Box, Typography, CircularProgress, Chip } from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"
import { useParams } from "react-router-dom"

const GetTickets = () => {
  const params = useParams()
  const { data: tickets = [], isLoading: fetching, error } = useGetTicketsQuery(params.id)
  
  const headers = [
    { label: "Ticket No", key: "ticket_number" },
    { label: "From", key: "start_point" },
    { label: "To", key: "destination" },
    { label: "Phone No", key: "phone_number" },
    { label: "Capacity", key: "ticket_capacity" },
    { label: "Created Date", key: "date" },
    { label: "Created Time", key: "bookedTime" },
    { label: "Status", key: "status_name" },
  ]

  const noTickets = tickets.length === 0
  
  const totalCapacity = useMemo(() => {
    if (!tickets.length) return null;
    return tickets.reduce((sum, ticket) => sum + ticket.ticket_capacity, 0);
  }, [tickets]);

  return (
    <>
      {tickets && (
        <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
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
            />
          ) : null}
        </Container>
      )}
    </>
  )
}

export default GetTickets
