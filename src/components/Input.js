import React from "react";

export default function input(props) {
  const { type, value, className, placeholder,handleInput,required,onClick } = props;
  return (
    <input
      type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={handleInput}
      required={required}
      onClick={onClick}
    />
  );
}
