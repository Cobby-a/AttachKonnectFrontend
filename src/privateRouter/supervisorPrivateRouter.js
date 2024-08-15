import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SupervisorPrivateRoute = ({ user, children, redirect }) => {
  const authenticate = localStorage.getItem('supervisorLoginStatus') ? true : false;
  const location = useLocation();
  return authenticate ? (
    children
  ) : (
    <Navigate
      to={`/portal?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

export default SupervisorPrivateRoute;