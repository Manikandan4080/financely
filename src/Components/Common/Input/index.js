import React from "react";
import "./style.css";

const Input = ({lable, placeholder, type, state, setState }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="custom-input"
    />
  );
};

export default Input;
