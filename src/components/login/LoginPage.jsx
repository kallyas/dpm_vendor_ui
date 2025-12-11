import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
import { login } from "../../redux/slices/authSlice";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../assets/images/dpm_logo.png";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: true,
      submitting: false,
      showPassword: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { username, password } = this.state;
      this.setState({ buttonDisabled: !username || !password });
    });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !this.state.buttonDisabled) {
      this.submit();
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
    const { username, password, buttonDisabled, submitting, showPassword } = this.state;

    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F1F3F5',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: 2,
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Logo and Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                component="img"
                src={logo}
                alt="DPM Logo"
                sx={{
                  height: 100,
                  mb: 3,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#A2302F',
                  mb: 1,
                }}
              >
                Vendor Portal Login
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#718096',
                }}
              >
                Enter your credentials to access your account
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={(e) => e.preventDefault()}>
              <TextField
                fullWidth
                label="Email Address"
                name="username"
                type="email"
                value={username}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#A2302F' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F1F3F5',
                    '&:hover fieldset': {
                      borderColor: '#A2302F',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#FFFFFF',
                      '& fieldset': {
                        borderColor: '#A2302F',
                        borderWidth: 2,
                      },
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#A2302F',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#A2302F' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.togglePasswordVisibility}
                        edge="end"
                        sx={{ color: '#718096' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F1F3F5',
                    '&:hover fieldset': {
                      borderColor: '#A2302F',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#FFFFFF',
                      '& fieldset': {
                        borderColor: '#A2302F',
                        borderWidth: 2,
                      },
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#A2302F',
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={buttonDisabled || submitting}
                onClick={this.submit}
                startIcon={!submitting && <LoginOutlined />}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  backgroundColor: '#A2302F',
                  color: '#FFFFFF',
                  borderRadius: 1,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#8B2826',
                    boxShadow: '0 4px 12px rgba(162, 48, 47, 0.3)',
                  },
                  '&:disabled': {
                    backgroundColor: '#CFCECA',
                    color: '#A09D96',
                  },
                }}
              >
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>
          </Paper>

          {/* Footer Text */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              mt: 3,
              color: '#718096',
            }}
          >
            © 2024 DPM Vendor Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>
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
