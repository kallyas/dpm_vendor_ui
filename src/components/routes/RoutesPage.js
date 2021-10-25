import React, {Component} from "react"
import {Container, Typography} from "@material-ui/core"
import SharedTable from "../shared/sharedTable/SharedTable"
import {getRoutes} from "../../redux/actions/getRoutesAction"
import {connect} from "react-redux"
import {toast} from "react-toastify"

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [],
      fetching: "129.5%",
      headers: [
        {label: "Route Code", key: "route_code"},
        {label: "From", key: "start_point"},
        {label: "To", key: "destination"},
      ],
    }
  }

  componentDidMount() {
    const {getRoutes} = this.props
    getRoutes()
  }

  componentWillReceiveProps(nextProps) {
    const {
      routes: {data, error},
    } = nextProps

    if (error) {
      this.setState({fetching: false})
      toast.error(error.message)
    } else {
      this.setState({fetching: false, routes: data})
    }
  }

  handleCheck = ({target}) => {
    const {checked, id} = target
    const {routes} = this.state
    const checkedRoutes = routes.map((route) => {
      const checkedRoute = {...route}
      if (id === "header") {
        checkedRoute.checked = checked
      }
      if (route.id == id) {
        checkedRoute.checked = checked
      }
      return checkedRoute
    })

    this.setState({routes: checkedRoutes})
  }

  render() {
    const {headers, routes, fetching} = this.state
    const allChecked = routes.every((route) => route.checked == true)
    return (
      <Container maxWidth={false}>
        <Typography variant="h4" style={{textAlign: "center", paddingTop: 30}}>
          Routes
        </Typography>
        <SharedTable
          fetching={fetching}
          hideDock={true}
          handleCheck={this.handleCheck}
          tableBody={routes}
          headers={headers}
          allChecked={allChecked}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({routes}) => {
  return {routes}
}

const mapDispatchToProps = {
  getRoutes,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
