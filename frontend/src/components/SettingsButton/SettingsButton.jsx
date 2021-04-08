import React from "react";

import { Button, UncontrolledTooltip } from "reactstrap";

import SettingsStyles from "./SettingsButton.module.css";

function SettingsButton() {
  return (
    <div className={SettingsStyles.SettingsButton} id="settings">
      <Button className="btn-round btn-icon" color="info" disabled>
        <i className="tim-icons icon-settings-gear-63" />
      </Button>
      <UncontrolledTooltip placement="bottom" target="settings">
        Settings
      </UncontrolledTooltip>
    </div>
  );
}

export default SettingsButton;
