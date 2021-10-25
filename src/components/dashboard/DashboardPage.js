import React, {useState, useEffect} from "react"
import {Container, Typography, makeStyles, Grid} from "@material-ui/core"
import {TrendingUp, Alarm} from "@material-ui/icons"
import {RouteCard} from "../shared/routeCard/RouteCard"
import {TripCard} from "../shared/tripCard/TripCard"
import {getTrips} from "../../redux/actions/getTripsAction"
import {getRoutes} from "../../redux/actions/getRoutesAction"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {CardsSkeleton} from "./skeleton"
import ContentLoader from "react-content-loader"

export const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100",
    padding: "50px 0px 0px 7%",
  },
  title: {
    display: "inline-flex",
    color: "#A2302F",
  },
}))

const Dashboard = (props) => {
  const classes = useStyles()
  const [trips, setTrips] = useState([])
  const [routes, setRoutes] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const {getRoutes, getTrips} = props
    setFetching(true)
    getRoutes()
    getTrips()
  }, [])

  useEffect(() => {
    const {trips, routes} = props
    if (trips.error || routes.error) {
      setFetching(false)
      if (trips.error) {
        toast.error(trips.error.message)
      }

      if (routes.error) {
        toast.error(routes.error.message)
      }
    }

    if (trips.data || routes.data) {
      setFetching(false)
      if (routes.data) {
        setRoutes(routes.data.filter((route, index) => index < 8))
      }

      if (trips.data) {
        setTrips(trips.data.filter((trip, index) => index < 8))
      }
    }
  }, [props.routes, props.trips])

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid
        style={{
          color: "#A2302F",
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "48px",
          lineHeight: "56px",
          textAlign: "center",
          paddingBottom: "40px",
        }}
      >
        Dashboard
      </Grid>
      <Grid className={classes.title}>
        <TrendingUp style={{padding: "0 5px", fontSize: "35px"}} />
        <Typography style={{fontSize: "25px"}}>Trending Routes</Typography>
      </Grid>
      <Container maxWidth={false} style={{display: "flex", flexWrap: "wrap"}}>
        {fetching === true ? (
          <ContentLoader style={{width: "100%", margin: "0px", height: "360"}}>
            <CardsSkeleton />
          </ContentLoader>
        ) : (
          routes.map((route) => <RouteCard route={route} />)
        )}
      </Container>
      <Grid className={classes.title}>
        <Alarm style={{padding: "0 5px", fontSize: "35px"}} />
        <Typography style={{fontSize: "25px"}}>Upcoming Trips</Typography>
      </Grid>
      <Container maxWidth={false} style={{display: "flex", flexWrap: "wrap"}}>
        {fetching === true ? (
          <ContentLoader style={{width: "100%", margin: "0px", height: "360"}}>
            <CardsSkeleton />{" "}
          </ContentLoader>
        ) : (
          trips.map((trip) => <TripCard trip={trip} />)
        )}
      </Container>
    </Container>
  )
}

const mapStateToProps = ({trips, routes}) => {
  return {trips, routes}
}

const mapDispatchToProps = {
  getRoutes,
  getTrips,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
