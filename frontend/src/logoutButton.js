import React from "react";
import styled from "styled-components";

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

const doLogout = () => {
  console.log("The log out button was clicked.");
  alert("logout successful.");
};

function LogoutButton() {
  return (
    <div className="LogoutButton">
      <Button onClick={doLogout}>Log Out</Button>
    </div>
  );
}

export default LogoutButton;
