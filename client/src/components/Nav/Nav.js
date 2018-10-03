import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-dark bg-success row">
      <strong className="navbar-brand mx-auto">
        <i className="fa fa-newspaper-o">
          <span>
            &nbsp; <a className="portLink" href="https://www.nytimes.com/">The New York Times Connection
            </a><br>
            This site is about retrieving, for educational purposes only, some of the articles published by the New York Times</br>
        </span>
        </i>
      </strong>

  </nav>
);

export default Nav;