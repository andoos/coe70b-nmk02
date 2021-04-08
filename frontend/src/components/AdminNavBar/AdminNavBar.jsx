import React from "react";

import { Navbar, Container } from "reactstrap";

import UpdateButton from "../UpdateButton/UpdateButton.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";
import SettingsButton from "../SettingsButton/SettingsButton.jsx";
import DateFilter from "../DateFilter/DateFilter.jsx";

function AdminNavBar(props) {
  return (
    <div className="navbar-dark">
      <Navbar expand="lg" color="dark">
        <Container fluid>
          <span className="navbar-text" style={{ fontSize: "20px" }}>
            Administrator's Dashboard
          </span>
          <div>
            <DateFilter />
            <SettingsButton />
            <UpdateButton setRefresh={props.setRefresh} />
            <LogoutButton />
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNavBar;
