import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { PersonPin, Person, Email, LocalPhone } from '@mui/icons-material';

export const UserCard = (props) => {
    const {first_name, last_name, email, phone_number} = props;

    return(
    <Paper sx={{
        width: '300px',
        height: '289px',
        background: '#EEEEEE',
        boxShadow: '4px 5px 6px rgba(162, 48, 47, 0.06)',
        borderRadius: '5px',
        margin: '20px 10px',
    }}>
        <Grid sx={{
            width: '100%',
            height: '138px',
            background: 'rgba(162, 48, 47, 0.5)',
            borderRadius: '10px',
            textAlign: 'center'
        }}>
            <PersonPin sx={{
                width: '114px',
                height: '120px',
            }}/>
        </Grid>
        <Grid sx={{ margin: '10px' }}>
            <Typography sx={{ marginTop: '10px' }}>
                <Person />
                <span style={{
                    position: "relative",
                    top: "-4px",
                    paddingLeft: '15px',
                    color: 'rgba(162, 48, 47, 0.5)'
                }}>{`${first_name} ${last_name}`}</span>
            </Typography>
            <Typography sx={{ marginTop: '10px' }}>
                <Email />
            <span style={{
                position: "relative",
                top: "-4px",
                paddingLeft: '15px',
                color: 'rgba(162, 48, 47, 0.5)'
            }}>{email}</span>
            </Typography>
            <Typography sx={{ marginTop: '10px' }}>
                <LocalPhone />
            <span style={{
                position: "relative",
                top: "-4px",
                paddingLeft: '15px',
                color: 'rgba(162, 48, 47, 0.5)'
            }}>{phone_number}</span>
            </Typography>
        </Grid>
    </Paper>
)}