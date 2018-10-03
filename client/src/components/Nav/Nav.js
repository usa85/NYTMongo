import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-dark bg-success row">
      <strong className="navbar-brand mx-auto">
        <i className="fa fa-newspaper-o">
          <span>
            &nbsp; <a className="portLink" href="https://www.nytimes.com/">The New York Times Connection
            </a>
        </span>
        </i>
      </strong>

  </nav>
);

export default Nav;