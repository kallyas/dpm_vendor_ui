import React from 'react';
import PropTypes from 'prop-types';
import { Button, 
    Container, FormControl, InputLabel, Input, Grid
 } from '@mui/material'
import TopNav from '../shared/topNav/Topnav';
import {PersonPin} from '@mui/icons-material';
import {useStyles} from '../login/login.styles';
import { Person, Lock } from '@mui/icons-material'
  
const LoginPage = (props) => {
    const classes = useStyles();
    return ( 
        <Container className={classes.authContainer} maxWidth={false}>
        <TopNav/>
        <Grid className={classes.formContainer}>
          <PersonPin className={classes.userIcon}/>
          <div className={classes.fieldsContainer} >
            <FormControl className={classes.root}>
                <InputLabel className={classes.inputLabel} htmlFor="email-singup"><Person/><span className={classes.fieldIcons}>Email</span></InputLabel>
                <Input className={classes.inputField}  id="email-singup"/>
            </FormControl>

            <FormControl className={classes.root}>
                <InputLabel className={classes.inputLabel} htmlFor="password-singup"><Lock/> <span className={classes.fieldIcons}>Password</span></InputLabel>
                <Input type="password" className={classes.inputField} id="password-signup"/>
            </FormControl>

            <FormControl className={classes.root}>
                <InputLabel className={classes.inputLabel} htmlFor="password-confirm-singup"><Lock/> <span className={classes.fieldIcons}>Confirm password</span></InputLabel>
                <Input type="password" className={classes.inputField} id="password-confirm-singup"/>
            </FormControl>
        </div>
            <Button className={classes.submitButton} size="medium" variant="contained" color="primary">Signup</Button>
        </Grid>
    </Container>);
}
 
LoginPage.propTypes = {
    n: PropTypes.func.isRequired
}
export default LoginPage;