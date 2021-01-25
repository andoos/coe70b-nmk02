import React from "react";

import { Row, Navbar, NavbarBrand, Container } from "reactstrap";

import UpdateButton from "../UpdateButton/UpdateButton.js";
import LogoutButton from "../LogoutButton/LogoutButton.js";

function AdminNavBar() {
  return (
    <div className="DashboardHeader">
      <Navbar expand="lg">
        <Container fluid>
          <div>
            <NavbarBrand>Administrator's Dashboard</NavbarBrand>
          </div>
          <div>
            <UpdateButton />
            <LogoutButton />
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdminNavBar;
