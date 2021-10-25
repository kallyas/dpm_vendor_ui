import React from "react"
import {makeStyles, Grid, Link, Tooltip} from "@material-ui/core"
import PeopleIcon from "@material-ui/icons/People"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import {
  Dashboard,
  DirectionsBus,
  CardTravel,
  CompareArrows,
} from "@material-ui/icons"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
const styles = makeStyles((theme) => ({
  record: {
    textAlign: "left",
    marginTop: "40px",
    paddingRight: "30px",
    paddingLeft: "14px",
  },
}))

const SideIconsMenu = () => {
  const classes = styles()
  return (
    <Grid
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 100%, rgba(255, 255, 255, 0) 100%)",
        top: "0px",
        height: "100vh",
        borderRadius: "5px",
        position: "fixed",
        left: "0px",
        color: "#A2302F",
        fontSize: "20px",
        fontWeight: "500",
        marginTop: "50px",
      }}
    >
      <Grid className={classes.record}>
        <Link href="/">
          <Tooltip title="Dashboard">
            <Dashboard />
          </Tooltip>
        </Link>
      </Grid>
      <Grid className={classes.record}>
        <Link href="/vehicles">
          <Tooltip title="Vehicles">
            <DirectionsBus />
          </Tooltip>
        </Link>
      </Grid>
      <Grid className={classes.record}>
        <Link href="/trips">
          <Tooltip title="Trips">
            <CardTravel />
          </Tooltip>
        </Link>
      </Grid>
      <Grid className={classes.record}>
        <Link href="/routes">
          <Tooltip title="Routes">
            <CompareArrows />
          </Tooltip>
        </Link>
      </Grid>
      <Grid className={classes.record}>
        <Link href="/users">
          <Tooltip title="Staff">
            <PeopleIcon />
          </Tooltip>
        </Link>
      </Grid>
      <Grid className={classes.record}>
        <Link href="/transactions">
          <Tooltip title="Transactions">
            <MonetizationOnIcon />
          </Tooltip>
        </Link>
      </Grid>
      <Grid className={classes.record}>
        <Link href="/logout">
          <Tooltip title="Logout">
            <ExitToAppIcon />
          </Tooltip>
        </Link>
      </Grid>
    </Grid>
  )
}

export default SideIconsMenu
