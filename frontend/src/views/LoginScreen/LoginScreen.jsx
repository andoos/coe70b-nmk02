import React, { useState, useRef, useEffect } from "react";
import loginStyles from "./LoginScreen.module.css";
import defaultUser from "../../assets/images/defaultUser.png";
import { Switch, Redirect } from "react-router-dom";
import axios from "axios"
import { Button } from "reactstrap";

const LoginScreen = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(["", ""]);
  const [loginError, setLoginError] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  const useDidMountEffect = (runFunction, trigger) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        runFunction();
      } else {
        didMount.current = true;
      }
    }, trigger);
  }

  useDidMountEffect(() => {
    if (
      usernameInput == credentials[0] &&
      passwordInput == credentials[1] 
    ) {
      setIsAuthenticated(true);
    } else {
      setLoginError(true);
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }, [credentials])

  function Authenticate() {
    axios.get("v1/api/credentials").then((response) => {
      setCredentials([response.data.username, response.data.password]);
    });
    console.log(credentials[0]);
    console.log(credentials[1]);
    setUsernameInput(document.getElementById("username").value);
    setPasswordInput(document.getElementById("password").value);
  }

  return (
    <div>
      <h1 style={{ margin: "20px" }}>United Nations of Covid</h1>
      <form id="loginForm">
        <div className={loginStyles.LoginBox}>
          <img className={loginStyles.ProfileUser} src={defaultUser}></img>
          {loginError ? (
            <h4 className={loginStyles.LoginError}>
              *Incorrect username or password
            </h4>
          ) : (
            <h4 className={loginStyles.LoginErrorEmpty}></h4>
          )}
          <div>
            <label>Username</label>
            <div>
              <input autocomplete="off" id="username" type="text"></input>
            </div>
          </div>
          <div>
            <label>Password</label>
            <input autocomplete="off" id="password" type="password"></input>
          </div>
          <div>
            <Button color="info" onClick={Authenticate}>
              Login
            </Button>
          </div>
        </div>
      </form>
      {isAuthenticated ? (
        <Switch>
          <Redirect from="/" to="/admin-dashboard"></Redirect>
        </Switch>
      ) : null}
    </div>
  );
};

export default LoginScreen;
