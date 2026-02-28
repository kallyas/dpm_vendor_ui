import { useMemo } from "react"
import { Container, Box, Typography, Grid } from "@mui/material"
import { TrendingUp, Alarm } from "@mui/icons-material"
import { RouteCard } from "../shared/routeCard/RouteCard"
import { TripCard } from "../shared/tripCard/TripCard"
import { useGetTripsQuery, useGetRoutesQuery } from "../../redux/api/apiSlice"
import { CardsSkeleton } from "./skeleton"
import ContentLoader from "react-content-loader"

const Dashboard = () => {
  const { data: routes = [], isLoading: routesLoading } = useGetRoutesQuery()
  const { data: trips = [], isLoading: tripsLoading } = useGetTripsQuery()

  const fetching = routesLoading || tripsLoading

  const displayRoutes = useMemo(() => {
    return routes.slice(0, 8)
  }, [routes])

  const displayTrips = useMemo(() => {
    return trips.slice(0, 8)
  }, [trips])

  const hasData = displayRoutes.length > 0 || displayTrips.length > 0

  return (
    <Container maxWidth="lg" sx={{
      py: 4,
      px: { xs: 2, sm: 3, md: 4 },
    }}>
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{
            fontWeight: 700,
            color: "primary.main",
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

      <Box sx={{ mb: 5 }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}>
          <TrendingUp sx={{ fontSize: "2.5rem", color: "primary.main" }} />
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Trending Routes
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {fetching ? (
            <ContentLoader style={{ width: "100%", margin: "0px", height: "360" }}>
              <CardsSkeleton />
            </ContentLoader>
          ) : (
            displayRoutes.map((route) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={route.id}>
                <RouteCard route={route} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}>
          <Alarm sx={{ fontSize: "2.5rem", color: "primary.main" }} />
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Upcoming Trips
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {fetching ? (
            <ContentLoader style={{ width: "100%", margin: "0px", height: "360" }}>
              <CardsSkeleton />
            </ContentLoader>
          ) : (
            displayTrips.map((trip) => (
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

export default Dashboard
