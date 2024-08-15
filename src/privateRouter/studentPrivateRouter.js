import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const StudentPrivateRoute = ({ user, children, redirect }) => {
  const authenticate = localStorage.getItem('studentLoginStatus') ? true : false;
  const location = useLocation();
  return authenticate ? (
    children
  ) : (
    <Navigate
      to={`/portal?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

export default StudentPrivateRoute;