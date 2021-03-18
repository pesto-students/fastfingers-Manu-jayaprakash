import React from "react";

export default function input(props) {
  const { type, value, className, placeholder,handleStartGame,handleUserName } = props;
  return (
    <input
      type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onClick={handleStartGame}
      onChange={handleUserName}
    />
  );
}
