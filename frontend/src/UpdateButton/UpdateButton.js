import UpdateStyles from "./UpdateButton.module.css";
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

const doUpdate = () => {
  console.log("The update button was clicked.");
  alert("updated.");
};

function UpdateButton() {
  return (
    <div className={UpdateStyles.UpdateButton}>
      <Button onClick={doUpdate}>Update</Button>
    </div>
  );
}

export default UpdateButton;
