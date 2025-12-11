import React from 'react';
import { Paper } from '@mui/material';
import {topNavStyles} from './styles';
import logo from '../../../assets/images/dpm_logo.png'

const TopNav = (props) => {
    return(
        <Paper sx={topNavStyles.logoContainer}>
            <img height='70' src={logo} alt='dpm logo'/>
        </Paper>
    )
};

export default TopNav;