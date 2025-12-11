import React, { Component } from 'react';
import { Container, Box, Typography } from '@mui/material';
import {UserCard} from '../shared/userCard/UserCard';
import { getStaff } from '../../redux/slices/staffSlice';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import AddUser from './AddUser';
import { PersonAdd } from '@mui/icons-material';
import {addUser} from '../../redux/actions/addUser';
import { createUserPayloadValidator} from './validator';
import { CardsSkeleton} from './skeleton';
import ContentLoader from "react-content-loader";

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {showAdd: false, submitDisabled: true, addError: '', submitting: false, staff: [], fetching: true}
    }

    componentDidMount() {
        const { getStaff } = this.props;
        getStaff();
    }

    componentWillReceiveProps(nextProps) {
        const {staff: {error, data}} = nextProps;
        if(data) {
            this.setState({staff: data, fetching: false})
        } else if(error) {
            this.setState({fetching: false})
            toast.error(error.message)
        } else {
            this.setState({fetching: false})
        }
    }


    toggleAdd = () => {
        const {showAdd} = this.state;
        this.setState({showAdd: !showAdd})
    }

    handleChange = async ({target}) => {
        const {name, value} = target
        const {first_name, last_name, email, phone_number, password} = this.state;
        const error = await createUserPayloadValidator({first_name, last_name, email, phone_number, password, [name]: value});
        this.setState({[name]: value, submitDisabled: error !== undefined ? true : false, addError: error});
        this.setState({[name]: value});
    }


    handleSubmit = async () => {
        const { first_name, last_name, email, phone_number, password } = this.state;
        this.setState({submitting: true});
        const result = await addUser({ first_name, last_name, email, phone_number, password });
        if(result) {
            this.toggleAdd();
            this.setState({fetching: true});
            this.props.getStaff();
        }
        this.setState({submitting: false})
    };

    render() { 
        const {submitting, showAdd, number_plate, capacity, submitDisabled, addError, fetching, staff} = this.state;
        return (
        <Container maxWidth="lg" sx={{ py: 4, px: {xs: 2, sm: 3, md: 4} }}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "#A2302F",
                  mb: 1,
                }}
              >
                Staff Management
              </Typography>
              <Typography 
                variant="body1" 
                sx={{
                  color: "text.secondary",
                }}
              >
                Manage your team members and staff details.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
                <PersonAdd 
                  onClick={this.toggleAdd} 
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    color: '#A2302F',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }} 
                  title="Add User"
                />
            </Box>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2}}>
            {
                fetching === true ? (
                    <ContentLoader
                      style={{ width: "100%", margin: "0px", height: "360" }}
                    >
                      <CardsSkeleton />
                    </ContentLoader>
                  ): staff.map(user => (
                    <Box key={user.id} sx={{ flex: '0 1 calc(25% - 8px)', minWidth: 250 }}>
                      <UserCard
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        phone_number={user.phone_number} 
                      />
                    </Box>
                  ))
            }
            </Box>
            {showAdd ? <AddUser 
                            submitting={submitting} 
                            error={addError} 
                            submitDisabled={submitDisabled} 
                            title="Add new User" 
                            number_plate={number_plate} 
                            capacity={capacity} 
                            handleChange={this.handleChange} 
                            handleSubmit={this.handleSubmit} 
                            toggleAdd={this.toggleAdd} /> : ''}
        </Container> );
    }
}

const mapStateToProps = ({staff}) => {
    return {staff}
};

const mapDispatchToprops = {
    getStaff,
};
 
export default connect(mapStateToProps, mapDispatchToprops)(Staff);