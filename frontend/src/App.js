import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AdminDashboard from "./views/AdminDashboard/AdminDashboard.jsx";

import "./assets/css/App.css";
import "black-dashboard-react/src/assets/css/black-dashboard-react.css";
import "./assets/css/nucleo-icons.css";

import LoginScreen from "./views/LoginScreen/LoginScreen.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={LoginScreen}></Route>
        <Route path="/admin-dashboard" exact component={AdminDashboard}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
