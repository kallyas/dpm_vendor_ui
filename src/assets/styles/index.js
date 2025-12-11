import { createTheme } from '@mui/material/styles';

const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#A2302F',
    },
    secondary: {
      main: '#424242'
    },
    error: {
      main: '#FF4141'
    }
  },
  typography: {
    fontFamily: [
      'Avenir',
      'medium',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

export default AppTheme;