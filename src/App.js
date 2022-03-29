import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainView from "./views/MainView/MainView";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MainView/> }>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
