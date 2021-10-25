import React from 'react';
import { Grid, Paper, makeStyles, Typography} from '@material-ui/core';
import { DirectionsBus, MoreVert, PersonPin, Person, Email, LocalPhone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        height: '289px',
        background: '#EEEEEE',
        boxShadow: '4px 5px 6px rgba(162, 48, 47, 0.06)',
        borderRadius: '5px',
        margin: '20px 10px',
    },
    top: {
        width: '100%',
        height: '138px',
        background: 'rgba(162, 48, 47, 0.5)',
        borderRadius: '10px',
        textAlign: 'center'
    },
    bottom: {
        margin: '10px'
    },
    personPin: {
        width: '114px',
        height: '120px',
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
        display: 'inline-flex',
        color: '#A09D96',
    },
    label: {
        position: "relative",
        top: "-4px",
        paddingLeft: '15px',
        color: 'rgba(162, 48, 47, 0.5)'
      },
    record: {
        marginTop: '10px'
    }
}));

export const UserCard = (props) => {
    const {first_name, last_name, email, phone_number} = props;
    const classes = useStyles();

    return(
    <Paper className={classes.root}>
        <Grid className={classes.top}>
            <PersonPin className={classes.personPin}/>
        </Grid>
        <Grid className={classes.bottom}>
            <Typography className={classes.record}>
                <Person />
                <span className={classes.label}>{`${first_name} ${last_name}`}</span>
            </Typography>
            <Typography className={classes.record}>
                <Email />
            <span className={classes.label}>{email}</span>
            </Typography>
            <Typography className={classes.record}>
                <LocalPhone />
            <span className={classes.label}>{phone_number}</span>
            </Typography>
        </Grid>
    </Paper>
)}