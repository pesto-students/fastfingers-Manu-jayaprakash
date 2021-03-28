import React, { useState, useEffect } from "react";

export default function Word({ randonWord, currentInput }) {
  const wordColorMatch = randonWord.split("").map((letter, index) => {
    if (index < currentInput.length) {
      if (letter.toUpperCase() === currentInput[index].toUpperCase()) {
        return (
          <span key={index} className="match">
            {letter.toUpperCase()}
          </span>
        );
      } else if (letter.toUpperCase() !== currentInput[index].toUpperCase()) {
        return (
          <span key={index} className="notMatch">
            {letter.toUpperCase()}
          </span>
        );
      }
    }

    return <span key={index}>{letter.toUpperCase()}</span>;
  });
  return (
    <div className="word-block">
      {wordColorMatch}
      
    </div>
  );
}
