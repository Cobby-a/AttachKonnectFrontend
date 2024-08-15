import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ManagerPrivateRoute = ({ user, children, redirect }) => {
  const authenticate = localStorage.getItem('managerLoginStatus') ? true : false;
  const location = useLocation();
  return authenticate ? (
    children
  ) : (
    <Navigate
      to={`/portal?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

export default ManagerPrivateRoute;