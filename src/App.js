import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './views/MainView/MainView';
import Login from './views/Login/Login'
import Register from './views/Register/Register';
import { AuthProvider, RequireAuth } from './components/RouterAuth/AuthProvider';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={ <MainView/> }/>
            <Route path='/Login' element={ <Login/> }/>
            <Route path='/Register' element={
              <RequireAuth>
                <Register/>
              </RequireAuth>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}

export default App;
