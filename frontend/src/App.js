import "./App.css";
import React from "react";
import UpdateButton from "./UpdateButton/UpdateButton";
import LogoutButton from "./LogoutButton/LogoutButton";
import LoginScreen from "./LoginScreen/LoginScreen";

const divStyle = {
  //display: 'flex',
  alighItems: "right",
};

function App() {
  /*const state = {
    loginCredentials: { username: "username", password: "password" },
    isAuthenticated: false,
  };*/
  return (
    <div className="App">
      {/* <LoginScreen credentials={this.state.loginCredentials}></LoginScreen> */}
      <div><h1>Administrator's Dashboard</h1></div>
      <div style={divStyle}><LogoutButton /><UpdateButton /></div>
    </div>
  );
}

export default App;
