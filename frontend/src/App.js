import './App.css';
import UpdateButton from './updateButton';
import LogoutButton from './logoutButton';
import React from 'react';

const divStyle = {
  //display: 'flex',
  alighItems: 'right',
};

function App() {
  return (
    <div className="App">
      <div><h1>Administrator's Dashboard</h1></div>
      <div style={divStyle}><LogoutButton /><UpdateButton /></div>
    </div>
  );
}

export default App;
