import React, {Component} from "react"
import {Container, Grid, Tabs} from "@material-ui/core"
import {getSingleTrip} from "../../redux/actions/getTripsAction"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import Tab from "@material-ui/core/Tab"
import TabPanel from "./TabPanel"
import {
  CardTravel,
  DirectionsBus,
  MoreVert,
  ArrowRight,
} from "@material-ui/icons"
import {Redirect} from "react-router"

class SingleTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: "228%",
      trips: [],
      tabNo: 0,
      tripsHeaders: [
        {label: "Vehicle", key: "number_plate"},
        {label: "Fare (UGX)", key: "tp_fare"},
        {label: "Travel Date", key: "date"},
        {label: "Time", key: "time"},
      ],
      busesHeaders: [
        {label: "PlateNo", key: "number_plate"},
        {label: "Capacity", key: "capacity"},
        {label: "Time", key: "time"},
      ],
    }
  }

  handleTabChange = (event, newValue) => {
    this.setState({tabNo: newValue})
  }
  componentDidMount() {
    const {getSingleTrip, match} = this.props
    getSingleTrip(match.params.id)
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

  render() {
    const {fetching, trips, tabNo, tripsHeaders, busesHeaders} = this.state
    const accessToken = localStorage.getItem("DPMAccessToken")
    const refreshToken = localStorage.getItem("DPMRefreshToken")
    if (!accessToken || !refreshToken) return <Redirect to="/login" />
    return (
      <Container style={{paddingTop: "50px"}} maxWidth={false}>
        <Grid
          style={{
            textAlign: "center",
            fontFamily: "verdana",
            fontSize: "30px",
          }}
        >
          {trips[0] ? (
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <div>
                <div
                  style={{
                    background: "#FFF",
                    border: "2px solid #A2302F",
                    color: "#A2302F",
                    borderRadius: "10px",
                    padding: "4px",
                  }}
                >
                  {trips[0] && trips[0].start_point}
                </div>
              </div>
              <MoreVert
                style={{
                  display: "inline-flex",
                  fontSize: "47px",
                  textAlign: "center",
                  transform: "rotate(90deg)",
                  color: "#A09D96",
                }}
              />
              <MoreVert
                style={{
                  display: "inline-flex",
                  textAlign: "center",
                  fontSize: "47px",
                  transform: "rotate(90deg)",
                  color: "#A09D96",
                }}
              />
              <MoreVert
                style={{
                  display: "inline-flex",
                  fontSize: "47px",
                  textAlign: "center",
                  transform: "rotate(90deg)",
                  color: "#A09D96",
                }}
              />
              <MoreVert
                style={{
                  display: "inline-flex",
                  fontSize: "47px",
                  textAlign: "center",
                  transform: "rotate(90deg)",
                  color: "#A09D96",
                }}
              />
              <ArrowRight
                style={{
                  display: "inline-flex",
                  fontSize: "47px",
                  textAlign: "center",
                  color: "#A09D96",
                }}
              />
              <div>
                <div
                  style={{
                    background: "#A2302F",
                    border: "2px solid #A2302F",
                    color: "#FFFF",
                    borderRadius: "10px",
                    padding: "4px",
                  }}
                >
                  {trips[0] && trips[0].destination}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Grid>
        <Tabs
          value={tabNo}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          style={{
            padding: "1px",
            marginLeft: "60px",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <Tab label="Trips" icon={<CardTravel />} />
          <Tab label="Buses" icon={<DirectionsBus />} />
        </Tabs>
        <TabPanel
          value={tabNo}
          index={0}
          headers={tripsHeaders}
          tableBody={trips}
          fetching={fetching}
        />
        <TabPanel
          value={tabNo}
          index={1}
          headers={busesHeaders}
          tableBody={trips}
          fetching={fetching}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({trips}) => {
  return {trips}
}

const mapDispatchToProps = {
  getSingleTrip,
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTrip)
