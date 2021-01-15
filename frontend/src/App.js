import './App.css';
import React, {Component} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: rgb(88, 85, 95);
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  margin: 0px 5px;
  &:hover {
    background-color: rgb(92, 89, 99);
  }
`;

class App extends Component {
  render() {
    return (
      <div className = 'App'>
        <h1>NMK02: Contact Tracing Wristband with Temperature Sensor and Cloud-based Monitoring Dashboard</h1>
        <Button onClick = {update}>
          Refresh
        </Button>
        <Button onClick = {logout}>
          logout
        </Button>
      </div>
    );
  }
}

function update(){
  alert('updated.');
}

function logout(){
  alert('logout successful.');
}

/*function App() {
  return (
    <div className="App">
      <p>hello</p>
    </div>
  );
}*/

export default App;
