import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
const Button = require("react-bootstrap/Button");
const Form = require("react-bootstrap/Form");
const Container = require("react-bootstrap/Container");
const Row = require("react-bootstrap/Row");
const Col = require("react-bootstrap/Col");
const Nav = require("react-bootstrap/Nav");
const Badge = require("react-bootstrap/Badge");

import AuthenticationService from "../service/AuthenticationService";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.children = { validated: false };
    this.state = { logado: AuthenticationService.isUserLoggedIn() };
  }

  render() {
    return (
      <footer className="main-footer">
        <strong>
          Copyright © 2021 JUMIA.
        </strong>{" "}
        All rights reserved.
      </footer>
    );
  }
}

export default Footer;
