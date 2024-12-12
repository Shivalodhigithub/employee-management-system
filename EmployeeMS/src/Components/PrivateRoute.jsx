import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({childern}) => {
  return localStorage.getItem("valid") ? childern : <Navigate to='/'/>
}

export default PrivateRoute
