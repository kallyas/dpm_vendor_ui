import React from 'react';
import { MoreVert, DateRange, Alarm } from '@mui/icons-material';
import money from '../../../assets/icons/money.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '280px',
        height: '190px',
        background: '#EEEEEE',
        boxShadow: '4px 5px 6px rgba(162, 48, 47, 0.06)',
        borderRadius: '5px',
        margin: '20px 10px'
    },
    destination: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '24px',
        lineHeight: '28px',
        color: '#865E5D',
        padding: '0px 20px 10px 20px'
    },
    source: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '28px',
        color: '#865E5D', 
        padding: '7px 20px 0px 20px'
        
    },
    busTrips: {
        display: 'block',
        color: '#A09D96',
    }
}));

export const TripCard = (props) => {
    const classes = useStyles();
    const {trip} = props;
    return(
    <Paper className={classes.root}>

        <Grid>
        <Typography className={classes.source}>{trip.start_point}</Typography>
        <Grid style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
            <Grid style={{color: '#A09D96'}}>
                <MoreVert style={{display: 'block', fontSize: '47px', height: '47px'}}/>
                <MoreVert style={{display: 'block', fontSize: '47px', height: '47px'}}/>
            </Grid>
            <Grid className={classes.busTrips}>
                <Grid style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}}>
                    <DateRange style={{fontSize: '23px', padding: '0px 10px'}}/>
                    <Typography style={{fontSize: '20px'}}>{trip.date}</Typography>
                </Grid>
                <Grid style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}}>
                    <Alarm style={{fontSize: '23px', padding: '0px 10px'}}/>
                    <Typography style={{fontSize: '20px'}}>{trip.time}</Typography>
                </Grid>
                <Grid style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}}>
                    <img alt='money-icon' src={money} style={{fontSize: '23px', width: '30px', padding: '0px 10px', color: '#A09D96'}}/>
                    <Typography style={{fontSize: '20px'}}>{trip.tp_fare}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Typography className={classes.destination}>{trip.destination}</Typography>
        </Grid>
    </Paper>
)}