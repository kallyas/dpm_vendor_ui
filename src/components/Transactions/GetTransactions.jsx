import React, {useEffect, useState} from "react"
import {getTransactions} from "../../redux/slices/transactionsSlice"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {Container, Box, Typography} from "@mui/material"
import SharedTable from "../shared/sharedTable/SharedTable"

const GetTransactions = (props) => {
  const [transactions, setTransactions] = useState([])
  const [fetching, setFetching] = useState("156.5%")
  const headers = [
    {label: "Phone No", key: "payer_number"},
    {label: "Amount", key: "amount"},
    {label: "Created Date", key: "date"},
    {label: "Created Time", key: "bookedTime"},
    {label: "Status", key: "status"},
  ]

  useEffect(() => {
    const {getTransactions} = props
    getTransactions()
  }, [])
  useEffect(() => {
    const {transactions} = props
    if (transactions.error) {
      setFetching(false)
      toast.error(transactions.error.message)
    } else {
      setFetching(false)
      setTransactions(transactions.data)
    }
  }, [props.transactions])
  return (
    <>
      {transactions && (
        <Container maxWidth="lg" sx={{ py: 4, px: {xs: 2, sm: 3, md: 4} }}>
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
            // handleCheck={this.handleCheck}
            // allChecked={allChecked}
          />
        </Container>
      )}
    </>
  )
}

const mapStateToProps = ({transactions}) => {
  return {transactions}
}

const mapDispatchToProps = {
  getTransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(GetTransactions)
