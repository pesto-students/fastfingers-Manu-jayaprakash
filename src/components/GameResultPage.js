import React from "react";
import GameHeader from "./GameHeader";
import { formatScore } from "../utils/util";

export default function GameResultPage({ changePage }) {
    const finalScore = JSON.parse(localStorage.getItem("score"));
    const playAgain = ()=>{
        changePage("/game")
    }
    const quitGame = ()=>{
        changePage("")
    }
  return (
    <div>
      <GameHeader />
      <div className="display-score">
        <h1>Score - {formatScore(finalScore[finalScore.length-1]).replace(".", ":")}</h1>
        <button onClick={playAgain} className="play-again-btn">Play Again</button>
      </div>
      <button onClick={quitGame} className="quit-btn">QUIT</button>
    </div>
  );
}
