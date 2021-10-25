import React, { Component } from 'react';
import { Paper, Grid, Button, TextField, Tooltip, CircularProgress } from '@material-ui/core'
class AddBus extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() { 
        const {number_plate, capacity, handleChange, handleSubmit, title, submitDisabled, error, submitting} = this.props;
        const {toggleAdd} = this.props;
        return ( <Paper  style={{width: '100vw', 
        height: '100vh', padding: '0px', outline: '0px',
        position: 'absolute', margin: '0px',
        left: '0px', background: 'rgba(146, 146, 146, 0.54)',
        right: '0px', zIndex: '100',
        }}>
            <Grid style={{ padding: '5px 0px', borderRadius: '5px', width: '40%', background: '#F6F8FA', margin : '10% auto 0px auto'}}>
                <Tooltip open={error && true} title={error} >
                    <Grid style={{color: '#A2302F', margin: '30px auto', textAlign: 'center', fontFamily: 'verdana', fontSize: '20px'}}>{title}</Grid>
                </Tooltip>
                <Grid style={{ 
                    width: '80%', padding: '20px 30px 50px 30px',
                                display: 'flex', 
                                margin: 'auto', justifyContent: 'space-between'}}>
                    <TextField onChange={handleChange} value={number_plate} name='number_plate' style={{color: '#A2302F'}} placeholder='Number plate'/>
                    <TextField onChange={handleChange} value={capacity} name='capacity' InputProps={{ inputProps: { min: 1 } }} style={{color: '#A2302F'}} type='number' placeholder='Capacity'/>
                </Grid>
                <Grid style={{ 
                    width: '80%', padding: '10px 5px',
                                display: 'flex', 
                                margin: 'auto', justifyContent: 'space-between'}}>
                <Button onClick={toggleAdd}
                        style={{padding: '5px 35px', 
                                display: 'block', 
                                margin: '0px'}} 
                        size='medium' 
                        variant='contained' 
                        color='secondary'>Cancel</Button>
                <Button disabled={submitDisabled} onClick={handleSubmit} 
                        style={{padding: '5px 35px', 
                                display: 'block', 
                                margin: '0px'}} 
                        size='medium' 
                        variant='contained' 
                        color='primary'>{submitting ? <CircularProgress size={20} color='white' /> : 'Submit' }</Button>
                </Grid>
            </Grid>
        </Paper> );
    }
}
 
export default AddBus;