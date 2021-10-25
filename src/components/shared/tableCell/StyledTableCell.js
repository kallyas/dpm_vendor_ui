import {TableCell} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#CFCECA',
      color: '#A2302F',
      // fontSize: '20px'
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '42px',
      padding: '5px'
    },
    body: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '35px',
      padding: '0px 5px'
    },
  }))(TableCell);