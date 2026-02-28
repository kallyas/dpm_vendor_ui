import { useGetTransactionsQuery } from "../../redux/api/apiSlice"
import { Container, Box, Typography } from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"

const GetTransactions = () => {
  const { data: transactions = [], isLoading: fetching } = useGetTransactionsQuery()
  
  const headers = [
    { label: "Phone No", key: "payer_number" },
    { label: "Amount", key: "amount" },
    { label: "Created Date", key: "date" },
    { label: "Created Time", key: "bookedTime" },
    { label: "Status", key: "status" },
  ]

  return (
    <>
      {transactions && (
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
              Transactions
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: "#666",
              }}
            >
              View all payment transactions and their status.
            </Typography>
          </Box>
          <SharedTable
            fetching={fetching}
            hideDock={true}
            tableBody={transactions}
            headers={headers}
          />
        </Container>
      )}
    </>
  )
}

export default GetTransactions
