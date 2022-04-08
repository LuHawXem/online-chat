import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider, AuthRouter, RequireAuth} from './components/RouterAuth/AuthProvider';
import './App.css';
import MainView from './views/MainView/MainView';
import Login from './views/Login/Login'
import Register from './views/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider Data={localStorage.getItem('session_id')}>
        <Routes>
          <Route path='/' element={
            <RequireAuth>
              <MainView/>
            </RequireAuth>
          }/>
          <Route path='/Login' element={
            <AuthRouter>
              <Login/>
            </AuthRouter>
          }/>
          <Route path='/Register' element={
            <AuthRouter>
              <Register/>
            </AuthRouter>
          }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
