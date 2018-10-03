import React from "react";
import "./FormBtn.css"

export const FormBtn = props => (
  <button {...props} className="form-group btn btn-success textcolor col-2">
    {props.children}
  </button>
);