import React from 'react'
import { Navigate, useLocation } from "react-router-dom";

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  return <AuthContext.Provider value={ null }>{ children }</AuthContext.Provider>
}

function RequireAuth({ children, RedirectTo }) {
  let data = localStorage.getItem('profile')
  let obj = JSON.parse(data) || null
  let location = useLocation()
  RedirectTo = RedirectTo ? RedirectTo : '/Login'

  if(!data || !obj || !obj.token) {
    return <Navigate to={ RedirectTo } state={{ from: location }} replace/>;
  }

  return children
}

function AuthRouter({ children, RedirectTo }) {
  let data = localStorage.getItem('profile')
  let obj = JSON.parse(data) || null
  let location = useLocation()
  RedirectTo = RedirectTo ? RedirectTo : '/'

  if(data && obj && obj.token) {
    return <Navigate to={ RedirectTo } state={{ from: location }} replace/>;
  }

  return children
}

export { AuthProvider, RequireAuth, AuthRouter }
