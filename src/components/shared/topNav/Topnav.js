import React from 'react';
import { Grid, Container, Paper } from '@material-ui/core';
import {topNavStyles} from './styles';
import logo from '../../../assets/images/dpm_logo.png'
const TopNav = (props) => {
    const classes = topNavStyles()
    return(
        <Paper className={classes.logoContainer}>
            <img height='70' src={logo} alt='dpm logo'/>
        </Paper>
    )
};

export default TopNav;