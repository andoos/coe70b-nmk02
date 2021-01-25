import React from "react";

import { Button } from "reactstrap";

import SettingsStyles from "./SettingsButton.module.css";

function SettingsButton() {
  return (
    <div className={SettingsStyles.SettingsButton}>
      <Button className="btn-round btn-icon" color="info">
        <i className="tim-icons icon-settings-gear-63" />
      </Button>
    </div>
  );
}

export default SettingsButton;
