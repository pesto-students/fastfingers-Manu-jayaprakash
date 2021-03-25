import React from "react";

const setCharColor = (currentCharacter, currentIndex, currentInput) => {
  if (currentInput.length === 0 || currentInput.length - 1 < currentIndex) {
    return "white-char";
  }

  if (
    currentCharacter.toUpperCase() === currentInput[currentIndex].toUpperCase()
  ) {
    return "right-char";
  }

  if (
    currentCharacter.toUpperCase() !== currentInput[currentIndex].toUpperCase()
  ) {
    return "wrong-char";
  }
};

export default function Word({ currentWord, currentInput }) {
  const wordCharacterArray = [...currentWord];

  if (!currentWord) {
    return <div></div>;
  }

  const content = wordCharacterArray.map((currentCharacter, currentIndex) => (
    <span
      key={currentIndex}
      className={`uppercase game-char ${setCharColor(
        currentCharacter,
        currentIndex,
        currentInput
      )}`}
    >
      {currentCharacter}
    </span>
  ));

  return <div>{content}</div>;
}
