import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import TopNav from "../shared/topNav/Topnav";
import { PersonPin, Person, Lock } from "@material-ui/icons";
import { useStyles } from "./login.styles";
import { login } from "../../redux/actions/login";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: true,
      submitting: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  submit = () => {
    const { username, password } = this.state;
    const { login } = this.props;
    login({ username, password });
    this.setState({ submitting: true });
  };

  componentDidMount(){
    const accessToken = localStorage.getItem("DPMAccessToken");
    const refreshTonek = localStorage.getItem("DPMRefreshToken");
    if(accessToken || refreshTonek){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, error } = nextProps;
    if (data) {
      toast.success(data.message);
      localStorage.setItem("DPMAccessToken", data.access_token);
      localStorage.setItem("DPMRefreshToken", data.refresh_token);
      localStorage.setItem("OperationArea", data?.region_name);
      window.location.assign('/dashboard')
    } else {
      toast.error(error);
    }
    this.setState({ submitting: false });
  }

  render() {
    const { username, password, buttonDisabled, submitting } = this.state;
    const classes = useStyles;
    return (
      <Container style={classes.authContainer} maxWidth={false}>
        <TopNav />
        <Grid style={classes.formContainer}>
          <PersonPin style={classes.userIcon} />
          <div style={classes.fieldsContainer}>
            <FormControl style={classes.root}>
              <InputLabel style={classes.inputLabel} htmlFor="email-login">
                <Person />
                <span style={classes.fieldIcons}>Email</span>
              </InputLabel>
              <Input
                autoComplete={false}
                name="username"
                value={username}
                onChange={this.handleChange}
                style={classes.inputField}
                id="email-login"
              />
            </FormControl>

            <FormControl style={classes.root}>
              <InputLabel style={classes.inputLabel} htmlFor="password-login">
                <Lock />
                <span style={classes.fieldIcons}>Password</span>
              </InputLabel>
              <Input
                autoComplete={false}
                name="password"
                value={password}
                onChange={this.handleChange}
                type="password"
                style={classes.inputField}
                id="password-login"
              />
            </FormControl>
          </div>
          <Button
            disabled={buttonDisabled}
            onClick={this.submit}
            style={classes.submitButton}
            size="medium"
            variant="contained"
            color="primary"
          >
            {" "}
            {submitting ? (
              <CircularProgress size={20} color="white" />
            ) : (
              "Login"
            )}{" "}
          </Button>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => {
  return loginReducer;
};

const mapDispatchToProps = {
  login,
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
