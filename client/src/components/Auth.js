import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRouter = (Component) => {
  const Auth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
      }
    }, [navigate]);

    return <Component {...props} />;
  };

  return Auth;
};

export default AuthRouter;