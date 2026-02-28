import { useState, useEffect } from "react";
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
import { useLoginMutation } from "../../redux/api/apiSlice";
import { toast } from "react-toastify";
import logo from "../../assets/images/dpm_logo.png";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const buttonDisabled = !username || !password;

  useEffect(() => {
    const accessToken = localStorage.getItem("DPMAccessToken");
    const refreshToken = localStorage.getItem("DPMRefreshToken");
    if (accessToken || refreshToken) {
      window.location.assign('/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !buttonDisabled) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await login({ username, password }).unwrap();
      toast.success(data.message);
      localStorage.setItem("DPMAccessToken", data.access_token);
      localStorage.setItem("DPMRefreshToken", data.refresh_token);
      localStorage.setItem("OperationArea", data?.region_name);
      window.location.assign('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

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

          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            <TextField
              fullWidth
              label="Email Address"
              name="username"
              type="email"
              value={username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleChange}
              onKeyPress={handleKeyPress}
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
                      onClick={togglePasswordVisibility}
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
              disabled={buttonDisabled || isLoading}
              onClick={handleSubmit}
              startIcon={!isLoading && <LoginOutlined />}
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
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </Paper>

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
};

export default LoginPage;
