import React, {useState, useEffect} from "react"
import { Container, Box, Typography, Grid } from "@mui/material"
import {TrendingUp, Alarm} from "@mui/icons-material"
import {RouteCard} from "../shared/routeCard/RouteCard"
import {TripCard} from "../shared/tripCard/TripCard"
import {getTrips} from "../../redux/slices/tripsSlice"
import {getRoutes} from "../../redux/slices/routesSlice"
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {CardsSkeleton} from "./skeleton"
import ContentLoader from "react-content-loader"

const Dashboard = (props) => {
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
    <Container maxWidth="lg" sx={{
      py: 4,
      px: {xs: 2, sm: 3, md: 4},
    }}>
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#A2302F",
            mb: 1,
          }}
        >
          Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          sx={{
            color: "text.secondary",
            fontSize: "1rem",
          }}
        >
          Welcome back! Here's an overview of your operations.
        </Typography>
      </Box>

      {/* Trending Routes Section */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}>
          <TrendingUp sx={{ fontSize: "2.5rem", color: "#A2302F" }} />
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              color: "#A2302F",
            }}
          >
            Trending Routes
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {fetching === true ? (
            <ContentLoader style={{width: "100%", margin: "0px", height: "360"}}>
              <CardsSkeleton />
            </ContentLoader>
          ) : (
            routes.map((route) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={route.id}>
                <RouteCard route={route} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Upcoming Trips Section */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}>
          <Alarm sx={{ fontSize: "2.5rem", color: "#A2302F" }} />
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              color: "#A2302F",
            }}
          >
            Upcoming Trips
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {fetching === true ? (
            <ContentLoader style={{width: "100%", margin: "0px", height: "360"}}>
              <CardsSkeleton />
            </ContentLoader>
          ) : (
            trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={trip.id}>
                <TripCard trip={trip} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
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
