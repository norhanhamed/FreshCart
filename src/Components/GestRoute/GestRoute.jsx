import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { userContext } from '../../Context/User.context';

export default function GestRoute({ children }) {
    const {token} = useContext(userContext);
    console.log(token)
    if (token) {
        return children;
    } else {
        return <Navigate to="/auth/login" />
    }

}
