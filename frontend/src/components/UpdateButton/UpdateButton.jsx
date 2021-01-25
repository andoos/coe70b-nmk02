import React from "react";

import { Button } from "reactstrap";

import UpdateStyles from "./UpdateButton.module.css";

const doUpdate = () => {
  console.log("The update button was clicked.");
  alert("updated.");
};

function UpdateButton() {
  return (
    <div className={UpdateStyles.UpdateButton}>
      <Button className="btn-round btn-icon" color="info" onClick={doUpdate}>
        <i className="tim-icons icon-refresh-02" />
      </Button>
    </div>
  );
}

export default UpdateButton;
