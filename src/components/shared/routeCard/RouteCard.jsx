import React from "react"
import { Card, CardContent, CardActionArea, Box, Typography, Stack } from "@mui/material"
import {DirectionsBus, ArrowForward} from "@mui/icons-material"
import {Link} from "react-router-dom"

export const RouteCard = (props) => {
  const {route} = props

  return (
    <Card 
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(162, 48, 47, 0.15)",
        },
        borderRadius: "12px",
        overflow: "hidden",
        background: "#EEEEEE",
        border: "1px solid rgba(162, 48, 47, 0.1)",
      }}
    >
      <CardActionArea 
        component={Link} 
        to={`/routes/${route.id}`}
        sx={{
          textDecoration: "none",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1, width: "100%", pb: 2 }}>
          {/* From - To Route Display */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1.5} 
            sx={{ mb: 3 }}
          >
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 700,
                color: "#865E5D",
                flex: 1,
              }}
            >
              {route.start_point}
            </Typography>
            <ArrowForward 
              sx={{ 
                color: "#A09D96",
                fontSize: "1.5rem",
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 700,
                color: "#865E5D",
                flex: 1,
              }}
            >
              {route.destination}
            </Typography>
          </Stack>

          {/* Trips Count */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1}
            sx={{
              backgroundColor: "rgba(162, 48, 47, 0.08)",
              borderRadius: "8px",
              padding: "12px 16px",
              width: "100%",
            }}
          >
            <DirectionsBus 
              sx={{ 
                color: "#A2302F",
                fontSize: "1.5rem",
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{
                fontWeight: 600,
                color: "#A2302F",
              }}
            >
              {route.trips === 0 ? "No" : route.trips} {route.trips === 1 ? "Trip" : "Trips"}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
