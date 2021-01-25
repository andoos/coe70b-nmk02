import React from "react";

import { Button } from "reactstrap";

import LogoutStyles from "./LogoutButton.module.css";

const doLogout = () => {
  console.log("The log out button was clicked.");
  alert("logout successful.");
};

function LogoutButton() {
  return (
    <div className={LogoutStyles.LogoutButton}>
      <Button className="btn-round btn-icon" color="info" onClick={doLogout}>
        <i className="tim-icons icon-upload" />
      </Button>
    </div>
  );
}

export default LogoutButton;
