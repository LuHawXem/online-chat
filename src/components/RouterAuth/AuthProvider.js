import React from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthContext = React.createContext(null);
function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children, Data, Login, Logout }) {
  console.log({ children, Data, Login, Logout })
  let value = { Data, Login, Logout }
  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}

function RequireAuth({ children, RedirectTo }) {
  let { data } = useAuth()
  let location = useLocation()
  RedirectTo = RedirectTo ? RedirectTo : '/Login'
  console.log(location)

  if(!data) {
    return <Navigate to={ RedirectTo } state={{ from: location }} replace/>;
  }

  return children
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let { login } = useAuth();
  console.log(location)
  let from = location.state?.from?.pathname || '/';

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let username = formData.get("username").toString();

    login(username, () => {
      navigate(from, { replace: true });
    })
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={ handleSubmit }>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export { AuthProvider, RequireAuth, useAuth }
