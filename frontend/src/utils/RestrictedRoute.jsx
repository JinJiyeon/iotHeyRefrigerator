import React from 'react';
import { Route ,Redirect } from 'react-router-dom';
import isLogin from './isLogin'

const RestrictedRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => ( 
      isLogin() && restricted ?
      <Component {...props} /> 
      : 
      <Redirect to="/signin" /> )} />
      
  );
};

export default RestrictedRoute;