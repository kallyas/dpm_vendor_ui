import React from 'react';
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


function PrivateRoute({component:Component , ...rest}){
    const isAuthenticated = localStorage.getItem('bareFootToken') !== null;

    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace state={{redirectTo: {...rest}}} />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.object
  };


export default PrivateRoute;