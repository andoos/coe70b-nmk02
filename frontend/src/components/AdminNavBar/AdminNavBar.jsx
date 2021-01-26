import React from "react";

import { Navbar, Container } from "reactstrap";

import UpdateButton from "../UpdateButton/UpdateButton.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";
import SettingsButton from "../SettingsButton/SettingsButton.jsx";

function AdminNavBar() {
  return (
    <div className="navbar-dark">
      <Navbar expand="lg" color="dark">
        <Container fluid>
          <span className="navbar-text" style={{ fontSize: "20px" }}>
            Administrator's Dashboard
          </span>
          <div>
            <SettingsButton />
            <UpdateButton />
            <LogoutButton />
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNavBar;