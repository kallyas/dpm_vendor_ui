import { makeStyles } from '@material-ui/core';

export const topNavStyles = makeStyles(theme => ({
    logoContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: 0,
      borderRadius: '0 0 25px 25px',
      boxShadow: '0px 4px 25px rgba(160,157,150, 0.12)'
    }
  }));