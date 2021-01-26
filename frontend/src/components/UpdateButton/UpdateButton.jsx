import React from "react";

import { Button, UncontrolledTooltip } from "reactstrap";

import UpdateStyles from "./UpdateButton.module.css";

const doUpdate = () => {
  console.log("The update button was clicked.");
  alert("updated.");
};

function UpdateButton() {
  return (
    <div className={UpdateStyles.UpdateButton} id="update">
      <Button className="btn-round btn-icon" color="info" onClick={doUpdate}>
        <i className="tim-icons icon-refresh-02" />
      </Button>
      <UncontrolledTooltip placement="bottom" target="update">
        Update
      </UncontrolledTooltip>
    </div>
  );
}

export default UpdateButton;
