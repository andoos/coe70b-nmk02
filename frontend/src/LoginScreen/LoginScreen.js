import React from "react";
import loginStyles from "./LoginScreen.module.css";
import styled from "styled-components";
import background from "../Assets/Images/loginBackground.png";
import defaultUser from "../Assets/Images/defaultUser.png";

const loginScreen = (props) => {
  const LoginScreen = styled.div`
        background-image:  linear-gradient(
            to right bottom,
            rgba(39, 195, 230, 0.8),
            rgba(137, 132, 222, 0.8)),
            url(${background});
        }
        background-size: cover;
        background-position: top;
        position: absolute;
        width: 100%;
        height: 100%;
    `;

  return (
    <LoginScreen>
      <h1>Covid, real?</h1>
      <div className={loginStyles.LoginBox}>
        <img className={loginStyles.ProfileUser} src={defaultUser}></img>
        <div>
          <label>Username:</label>
          <div>
            <input type="text"></input>
          </div>
        </div>
        <div>
          <label>Password:</label>
          <input type="text"></input>
        </div>
          <div><button type="button">Submit</button></div>
      </div>
    </LoginScreen>
  );
};

export default loginScreen;
