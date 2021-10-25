import React, { Component } from 'react';
import { Container, Grid, StepButton, Tooltip } from '@material-ui/core';
import {UserCard} from '../shared/userCard/UserCard';
import { getStaff } from '../../redux/actions/getStaffAction';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import AddUser from './AddUser';
import { PersonAdd } from '@material-ui/icons';
import {addUser} from '../../redux/actions/addUser';
import { createUserPayloadValidator} from './validator';
import { CardsSkeleton} from './skeleton';
import ContentLoader from "react-content-loader";
// import {} from '@material-ui/icons';

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
        } else {
            this.setState({fetching: false})
            toast.error(error.message)
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
        <Container style={{paddingTop: '50px', paddingLeft: '70px'}}  maxWidth={false} >
            <Grid style={{ textAlign: 'center', fontFamily: 'verdana', fontSize: '30px', paddingBottom: '50px'}}>Staff</Grid>
            <Tooltip title="Add User">
                <PersonAdd onClick={this.toggleAdd} style={{width: '50', height: '39', cursor: 'pointer'}} />
            </Tooltip>
            <Grid style={{display: "flex", flexWrap: "wrap"}}>

            {
                fetching === true ? (
                    <ContentLoader
                      style={{ width: "100%", margin: "0px", height: "360" }}
                    >
                      <CardsSkeleton />
                    </ContentLoader>
                  ): staff.map(user => <UserCard
                    first_name={user.first_name}
                    last_name={user.last_name}
                    email={user.email}
                    phone_number={user.phone_number} 
                    />)
            }
            </Grid>
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