import React, { useState, useEffect } from 'react';
import { Paper, Grid, Input, Button, FormControl, MenuItem, InputLabel, Select, Tooltip, CircularProgress } from '@material-ui/core';
import {connect} from 'react-redux';
import { getVehicles } from '../../redux/actions/getVehiclesAction';
import { getRoutes } from '../../redux/actions/getRoutesAction';
import { toast } from 'react-toastify'

const AddTrip  =  (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [routes, setRoutes] = useState([]);
    
    useEffect(() => {
        const {getRoutes, getVehicles} = props;
            getVehicles();
            getRoutes();
    }, []);

    useEffect(() => {
        const {vehicles: {data, error}} = props;
        if(data) {
            setVehicles(data);
        }else if(error) {
            toast.error(error.message); 
        }
    }, [props.vehicles]);
    
    useEffect(() => {
        const {routes: {data, error}} = props;
        if(data) {
            setRoutes(data);
        }else if(error) {
            toast.error(error.message); 
        }
    }, [props.routes]);

        const { toggleAdd, route_id, vehicle_id, tp_fare, setoff_time, handleChange, handleSubmit, title, error, submitDisabled, submitting } = props;
        return ( <Paper style={{width: '100vw', 
        height: '100vh', padding: '0px', outline: '0px',
        position: 'absolute', margin: '0px',
        left: '0px', background: 'rgba(146, 146, 146, 0.54)',
        right: '0px', zIndex: '100',
        }}>
            <Grid style={{ padding: '5px 0px', borderRadius: '5px', width: '40%', background: '#F6F8FA', margin : '10% auto 0px auto'}}>
                <Tooltip title={error} open={error&&true}>
                    <Grid style={{color: '#A2302F', margin: '30px auto 0px auto', textAlign: 'center', fontFamily: 'verdana', fontSize: '20px'}}>{title}</Grid>
                </Tooltip>
                <Grid style={{ 
                                width: '90%', 
                                padding: '25px 30px',
                                display: 'flex', 
                                margin: 'auto', 
                                justifyContent: 'space-between'}}>
                <FormControl style={{width: '45%'}}>
                    <InputLabel id="route-select-label">Route</InputLabel>
                    <Select
                    onChange={handleChange}
                    labelId="route-select-label"
                    id="route-select-label"
                    value={route_id}
                    name="route_id"
                    >
                        {routes && routes.map(route => <MenuItem value={route.id}>{route.route_code}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl style={{width: '45%'}}>
                    <InputLabel  htmlFor="tp-fare">Fare (UGX)</InputLabel>
                    <Input name="tp_fare" value={tp_fare} onChange={handleChange} InputProps={{ inputProps: { min: 1 } }} type="number"  id="tp-fare"/>
                </FormControl>
                </Grid>
                <Grid style={{ 
                                width: '90%', 
                                padding: '25px 30px',
                                display: 'flex', 
                                margin: 'auto', 
                                justifyContent: 'space-between'}}>
                    
                <FormControl style={{width: '45%'}}>
                    <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
                    <Select
                    onChange={handleChange}
                    labelId="vehicle-select-label"
                    id="vehicle-select-label"
                    value={vehicle_id}
                    name="vehicle_id"
                    >
                        {vehicles && vehicles.map(vehicle => <MenuItem value={vehicle.id}>{vehicle.number_plate}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl style={{width: '45%'}}>   
                    <InputLabel  id="time-select-label">SetOff Time</InputLabel>
                    <Input
                        id="time-select-label"
                        onChange={handleChange}
                        name="setoff_time"
                        label="Setoff Time"
                        type="datetime-local"
                        value={setoff_time}
                    />
                </FormControl>     
                </Grid>
                <Grid style={{ 
                    width: '90%', padding: '10px 5px',
                                display: 'flex', 
                                margin: 'auto', justifyContent: 'space-between'}}>
                <Button onClick={toggleAdd}
                        style={{padding: '5px 35px', 
                                display: 'block', 
                                margin: '0px'}} 
                        size="medium" 
                        variant="contained" 
                        color="secondary">Cancel</Button>

                <Button onClick={handleSubmit} 
                        disabled={submitDisabled}
                        style={{padding: '5px 35px', 
                                display: 'block', 
                                margin: '0px'}} 
                        size="medium" 
                        variant="contained" 
                        color="primary">{submitting ? <CircularProgress size={20} color='white' /> : 'Submit' }</Button>
                </Grid>
            </Grid>
        </Paper> );
}

const mapStateToProps = ({routes, vehicles}) => {
    return {vehicles, routes}
}

const mapDispatchToProps = {
    getRoutes,
    getVehicles
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddTrip);