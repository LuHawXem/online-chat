import React from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  return <AuthContext.Provider value={ null }>{ children }</AuthContext.Provider>
}

function RequireAuth({ children, RedirectTo }) {
  let data = localStorage.getItem('session_id')
  let location = useLocation()
  RedirectTo = RedirectTo ? RedirectTo : '/Login'
  console.log({location, data})

  if(!data) {
    return <Navigate to={ RedirectTo } state={{ from: location }} replace/>;
  }

  return children
}

function AuthRouter({ children, RedirectTo }) {
  let data = localStorage.getItem('session_id')
  let location = useLocation()
  RedirectTo = RedirectTo ? RedirectTo : '/'
  console.log({location, data})

  if(data) {
    return <Navigate to={ RedirectTo } state={{ from: location }} replace/>;
  }

  return children
}

export { AuthProvider, RequireAuth, AuthRouter }
