import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  return function AuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      // Check if the token is present in the HTTP-only cookie
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);

    if (isAuthenticated === null) {
      return null; 
    }


    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
};

export default withAuthentication;