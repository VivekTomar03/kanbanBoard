import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { auth, token, role, username } = useSelector((state) => state);
    if(!auth){
        return <Navigate to={"/login"} />
      }
    
      return children
}

export default PrivateRoute;
