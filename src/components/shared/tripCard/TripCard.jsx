import React from 'react';
import { Card, CardContent, Box, Typography, Stack } from '@mui/material';
import { DateRange, Alarm, ArrowForward } from '@mui/icons-material';
import money from '../../../assets/icons/money.svg'

export const TripCard = (props) => {
    const {trip} = props;
    return(
    <Card sx={{
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
    }}>
        <CardContent sx={{ flexGrow: 1, width: "100%", pb: 2 }}>
        {/* Route Display */}
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={1.5} 
          sx={{ mb: 2 }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 700,
              color: "#865E5D",
              flex: 1,
            }}
          >
            {trip.start_point}
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
            {trip.destination}
          </Typography>
        </Stack>

        {/* Trip Details */}
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <DateRange sx={{ color: "#A2302F", fontSize: "1.3rem" }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {trip.date}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Alarm sx={{ color: "#A2302F", fontSize: "1.3rem" }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {trip.time}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              component="img"
              src={money}
              alt="fare"
              sx={{
                width: "1.3rem",
                height: "1.3rem",
                color: "#A2302F",
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                color: "#A2302F",
              }}
            >
              UGX {trip.tp_fare}
            </Typography>
          </Stack>
        </Stack>
        </CardContent>
    </Card>
)}
