import React, {useState} from "react"
import {
  Paper,
  makeStyles,
  Grid,
  StepButton,
  Link,
  Tooltip,
} from "@mui/material"
import {
  Dashboard,
  DirectionsBus,
  CompareArrows,
  Apps,
  CardTravel,
  People,
  ExitToApp,
} from "@mui/icons-material"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import SideIconsMenu from "./SideIconsMenu"

const styles = makeStyles((theme) => ({
  container: {
    width: "15%",
    height: "100vh",
    background:
      "linear-gradient(180deg, #FFFFFF 100%, rgba(255, 255, 255, 0) 100%)",
    // borderRadius: '0px 80px 0px 0px',
    display: "inline-flex",
    justifyContent: "center",
    position: "fixed",
    zIndex: 100,
  },
  logo: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    margin: "auto",
    display: "block",
  },
  label: {
    position: "relative",
    top: "-4px",
    overflowWrap: "break-word",
    display: "inline",
  },
  record: {
    textAlign: "left",
    marginBottom: "40px",
    paddingLeft: "30px",
  },
}))

export const SideNav = (props) => {
  const classes = styles()
  const [hidden, setHide] = useState(true)

  const toggleNav = () => {
    setHide(!hidden)
  }

  return (
    <Paper
      style={
        hidden
          ? {left: "-18%", transition: "left 0.5s"}
          : {left: "0px", transition: "left 0.5s"}
      }
      className={classes.container}
      elevation={1}
    >
      <StepButton
        style={{
          position: "fixed",
          cursor: "pointer",
          borderRadius: "50%",
          left: "0px",
          width: "60px",
          top: "10px",
          fontWeight: "bold",
          background:
            "linear-gradient(180deg, #FFFFFF 100%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <Tooltip title="Menu">
          <Apps
            onClick={toggleNav}
            style={{fontSize: "40px", color: "#A2302F"}}
          />
        </Tooltip>
      </StepButton>
      {hidden ? <SideIconsMenu /> : ""}
      <Grid
        style={{
          width: "100%",
          position: "relative",
          top: "50px",
          display: hidden ? "none" : "block",
        }}
      >
        <img
          className={classes.logo}
          alt="Bus operator logo"
          src="https://via.placeholder.com/150"
        />
        <Grid
          style={{
            color: "#A2302F",
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "50px",
          }}
        >
          <Grid className={classes.record}>
            <Link href="/">
              <Dashboard />
              <span className={classes.label}>Dashboard</span>
            </Link>
          </Grid>
          <Grid className={classes.record}>
            <Link href="/vehicles">
              <DirectionsBus />
              <span className={classes.label}>Buses</span>
            </Link>
          </Grid>
          <Grid className={classes.record}>
            <Link href="/trips">
              <CardTravel />
              <span className={classes.label}>Trips</span>
            </Link>
          </Grid>
          <Grid className={classes.record}>
            <Link href="/routes">
              <CompareArrows />
              <span className={classes.label}>Routes</span>
            </Link>
          </Grid>
          <Grid className={classes.record}>
            <Link href="/users">
              <People />
              <span className={classes.label}>Staff</span>
            </Link>
          </Grid>
          <Grid className={classes.record}>
            <Link href="/transactions">
              <MonetizationOnIcon />
              <span className={classes.label}>Transactions</span>
            </Link>
          </Grid>
          <Grid className={classes.record}>
            <Link href="/logout">
              <ExitToApp />
              <span className={classes.label}>Logout</span>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
