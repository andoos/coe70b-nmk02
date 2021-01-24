import React from "react";

import { Row, Navbar, NavbarBrand, Container } from "reactstrap";

import UpdateButton from "../../components/UpdateButton/UpdateButton.js";
import LogoutButton from "../../components/LogoutButton/LogoutButton.js";

function AdminHeader() {
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

export default AdminHeader;
