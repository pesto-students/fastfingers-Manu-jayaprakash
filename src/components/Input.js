import React from "react";

export default function input(props) {
  const { type, value, className, placeholder,handleUserName,required } = props;
  return (
    <input
      type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={handleUserName}
      required={required}
    />
  );
}
