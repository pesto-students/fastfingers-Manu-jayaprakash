import React from "react";
import GamePageHeader from "./GamePageHeader";
import Input from "./Input";

function playAgain() {
  window.location.pathname = "/game";
}
function stopGame() {
  window.localStorage.setItem("activeUser", "");
  window.localStorage.setItem("score", "");
  window.location.pathname = "";
}
function processScore() {
  const date = new Date(0);
  date.setSeconds(localStorage.getItem("score")); // specify value for SECONDS here
  return date.toISOString().substr(11, 8);
}
export default function GameEnd() {
  return (
    <>
      <GamePageHeader />
      <div className="display-score">
        <h1>Score - {processScore()}</h1>
        <Input
          type="button"
          value="PLAY AGAIN"
          onClick={playAgain}
          className="play-again-btn"
        />
      </div>
      <Input
        type="button"
        value="STOP GAME"
        onClick={stopGame}
        className="stop-btn"
      />
    </>
  );
}
