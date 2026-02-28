import { Paper, Grid, Button, TextField, Tooltip, CircularProgress } from '@mui/material'

const AddUser = ({ first_name, last_name, phone_number, email, handleChange, handleSubmit, title, submitDisabled, error, submitting, toggleAdd }) => {
  return (
    <Paper style={{
      width: '100vw',
      height: '100vh',
      padding: '0px',
      outline: '0px',
      position: 'absolute',
      margin: '0px',
      left: '0px',
      background: 'rgba(146, 146, 146, 0.54)',
      right: '0px',
      zIndex: '100',
      top: '0px',
    }}>
      <Grid style={{ padding: '5px 0px', borderRadius: '5px', width: '40%', background: '#F6F8FA', margin: '10% auto 0px auto' }}>
        <Tooltip open={!!error} title={error || ''}>
          <Grid style={{ color: '#A2302F', margin: '30px auto', textAlign: 'center', fontFamily: 'verdana', fontSize: '20px' }}>{title}</Grid>
        </Tooltip>
        <Grid style={{
          width: '80%',
          padding: '20px 30px 50px 30px',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-between'
        }}>
          <TextField onChange={handleChange} value={first_name} name='first_name' style={{ color: '#A2302F' }} placeholder='First Name' />
          <TextField onChange={handleChange} value={last_name} name='last_name' InputProps={{ inputProps: { min: 1 } }} style={{ color: '#A2302F' }} type='text' placeholder='Last Name' />
        </Grid>
        <Grid style={{
          width: '80%',
          padding: '20px 30px 50px 30px',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-between'
        }}>
          <TextField onChange={handleChange} value={email} name='email' style={{ color: '#A2302F' }} type='email' placeholder='Email' />
          <TextField onChange={handleChange} value={phone_number} name='phone_number' InputProps={{ inputProps: { min: 1 } }} style={{ color: '#A2302F' }} type='text' placeholder='Phone Number' />
        </Grid>
        <Grid style={{
          width: '80%',
          padding: '20px 30px 50px 30px',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-between'
        }}>
          <TextField onChange={handleChange} value={email} type='password' name='password' style={{ color: '#A2302F' }} placeholder='Password' />
        </Grid>
        <Grid style={{
          width: '80%',
          padding: '10px 5px',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-between'
        }}>
          <Button onClick={toggleAdd}
            style={{
              padding: '5px 35px',
              display: 'block',
              margin: '0px'
            }}
            size='medium'
            variant='contained'
            color='secondary'>Cancel</Button>
          <Button disabled={submitDisabled} onClick={handleSubmit}
            style={{
              padding: '5px 35px',
              display: 'block',
              margin: '0px'
            }}
            size='medium'
            variant='contained'
            color='primary'>
            {submitting ? <CircularProgress size={20} color='white' /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddUser;
