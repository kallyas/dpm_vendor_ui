import React, {useState} from "react"
import {
  Paper,
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

export const SideNav = (props) => {
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
      sx={{
        width: "15%",
        height: "100vh",
        background:
          "linear-gradient(180deg, #FFFFFF 100%, rgba(255, 255, 255, 0) 100%)",
        display: "inline-flex",
        justifyContent: "center",
        position: "fixed",
        zIndex: 100,
      }}
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
          style={{
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            margin: "auto",
            display: "block",
          }}
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
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/">
              <Dashboard />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Dashboard</span>
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/vehicles">
              <DirectionsBus />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Buses</span>
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/trips">
              <CardTravel />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Trips</span>
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/routes">
              <CompareArrows />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Routes</span>
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/users">
              <People />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Staff</span>
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/transactions">
              <MonetizationOnIcon />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Transactions</span>
            </Link>
          </Grid>
          <Grid sx={{ textAlign: "left", marginBottom: "40px", paddingLeft: "30px" }}>
            <Link href="/logout">
              <ExitToApp />
              <span style={{ position: "relative", top: "-4px", overflowWrap: "break-word", display: "inline" }}>Logout</span>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
