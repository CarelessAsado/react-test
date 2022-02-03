import React from "react";

export const InputForm = ({ id, type, value, title, handleChangeInput }) => {
  return (
    <div className="formControl">
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        name={id}
        value={value}
        id={id}
        onChange={handleChangeInput}
      ></input>
    </div>
  );
};
