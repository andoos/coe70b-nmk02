import React, { useState } from "react";

import { Button, UncontrolledTooltip } from "reactstrap";

import LogoutStyles from "./LogoutButton.module.css";

import { Switch, Redirect } from "react-router-dom";

function LogoutButton() {
  const [isLogout, setIsLogout] = useState(false);

  const doLogout = () => {
    console.log("The log out button was clicked.");
    setIsLogout(true);
    <Switch>
      <Redirect from="/admin-dashboard" to="/"></Redirect>
    </Switch>;
  };

  return (
    <div className={LogoutStyles.LogoutButton} id="logout-tip">
      <Button className="btn-round btn-icon" color="info" onClick={doLogout}>
        <i className="tim-icons icon-upload" />
      </Button>
      <UncontrolledTooltip placement="bottom" target="logout-tip">
        Log Out
      </UncontrolledTooltip>
      {isLogout ? (
        <Switch>
          <Redirect from="/admin-dashboard" to="/"></Redirect>
        </Switch>
      ) : null}
    </div>
  );
}

export default LogoutButton;
