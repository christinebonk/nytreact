import React from "react";

export const Input = props => (
  <div className="input-field">
    <input {...props}/>
    <label >{props.label}</label>
 </div>
);
