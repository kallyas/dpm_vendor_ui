import React from "react"
import {DirectionsBus, MoreVert} from "@mui/icons-material"
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "280px",
    height: "170px",
    background: "#EEEEEE",
    "&:hover": {
      opacity: 0.4,
    },
    boxShadow: "4px 5px 6px rgba(162, 48, 47, 0.06)",
    borderRadius: "5px",
    margin: "20px 10px",
  },
  destination: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "28px",
    color: "#865E5D",
    padding: "0px 20px 10px 20px",
  },
  source: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "28px",
    color: "#865E5D",
    padding: "7px 20px 0px 20px",
  },
  busTrips: {
    display: "inline-flex",
    color: "#A09D96",
  },
}))

export const RouteCard = (props) => {
  const {route} = props
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Grid>
        <Link style={{textDecoration: "none"}} to={`/routes/${route.id}`}>
          <Typography className={classes.source}>
            {route.start_point}
          </Typography>
          <Grid
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "cnter",
            }}
          >
            <Grid style={{color: "#A09D96"}}>
              <MoreVert
                style={{display: "block", fontSize: "47px", height: "47px"}}
              />
              <MoreVert
                style={{display: "block", fontSize: "47px", height: "47px"}}
              />
            </Grid>
            <Grid className={classes.busTrips}>
              <DirectionsBus style={{fontSize: "35px", padding: "0px 10px"}} />
              <Typography style={{fontSize: "25px"}}>
                {route.trips === 0 ? "No" : route.trips} Trips
              </Typography>
            </Grid>
          </Grid>
          <Typography className={classes.destination}>
            {route.destination}
          </Typography>
        </Link>
      </Grid>
    </Paper>
  )
}
