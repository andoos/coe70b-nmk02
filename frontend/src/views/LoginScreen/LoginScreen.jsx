import React, { useState, useRef, useEffect } from "react";
import loginStyles from "./LoginScreen.module.css";
import styled from "styled-components";
import background from "../../assets/images/loginBackground.jpg";
import defaultUser from "../../assets/images/defaultUser.png";
import { Switch, Redirect } from "react-router-dom";
import axios from "axios"

import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";

const LoginScreen = (props) => {
  const LoginScreen = styled.div`
    background-size: cover;
    background-position: top;
    position: absolute;
    width: 100%;
    height: 100%;
  `;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(["", ""]);
  const [loginError, setLoginError] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  }

  useDidMountEffect(() => {
    if (
      usernameInput === credentials[0] &&
      passwordInput === credentials[1] 
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
    <LoginScreen>
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
            {/* <button type="button" onClick={Authenticate}>
              Login
            </button> */}
          </div>
        </div>
      </form>
      {/* <div classname={loginStyles.Card}>
        <Card className="w-50 my-auto">
          <CardBody>
            <form id="LoginForm">
              <FormGroup>
                <Label for="exampleEmail1">Email address</Label>
                <Input
                  autocomplete="off"
                  type="email"
                  name="email"
                  id="exampleEmai1l"
                  placeholder="name@example.com"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail1">Email address</Label>
                <Input
                  autocomplete="off"
                  type="email"
                  name="email"
                  id="exampleEmai1l"
                  placeholder="name@example.com"
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </div> */}

      {isAuthenticated ? (
        <Switch>
          <Redirect from="/" to="/admin-dashboard"></Redirect>
        </Switch>
      ) : null}
    </LoginScreen>
  );
};

export default LoginScreen;
