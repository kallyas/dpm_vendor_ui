import React, {useEffect, useState} from "react"
import {getTransactions} from "../../redux/actions/getTransactions"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {Container, Typography} from "@material-ui/core"
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
        <Container maxWidth={false}>
          <Typography
            variant="h4"
            style={{textAlign: "center", paddingTop: 30}}
          >
            Transactions
          </Typography>
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
