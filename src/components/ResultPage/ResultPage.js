import React, { useState } from "react";
import Header from "../Header";
import ResultHeader from "../ResultHeader";
import HomePage from "../HomePage/HomePage";
import reload_image from "../../assets/reload.png";
import {
  SessionKeys,
  getNameOfCurrentUserScores
} from "../util";

export default function ResultPage({ playAgain }) {
  const playerName = sessionStorage.getItem(SessionKeys.PLAYERNAME);
  const currentUserScores = sessionStorage.getItem(
    getNameOfCurrentUserScores(playerName)
  );
  const currentUserScoresArray = currentUserScores
    ? currentUserScores.trim().split(" ")
    : 1;
  const gameName = currentUserScoresArray.length;

  const [isNewGame, setIsNewGame] = useState(false);

  const currentScore =
    Number(localStorage.getItem("score")) + 1;

  const formatScore = ()=>{
    var date = new Date(0);
    date.setSeconds(currentScore); 
    var timeString = date.toISOString().substr(14, 5);
    return timeString;
  }

  const quitGame = () => {
    sessionStorage.clear();
    setIsNewGame(true);
  };

  return isNewGame ? (
    <HomePage />
  ) : (
    <main>
      <ResultHeader
        difficulty={sessionStorage.getItem(SessionKeys.DIFFICULTYLEVEL)}
        isGameOver={true}  displayHeder={true} isGamePage ={false}
      />
      <section className="score-body-section">
        <div className="score-container">
          <div className="score-heading">{`SCORE : GAME ${gameName}`}</div>
          <div className="score-count">{formatScore()}</div>
        </div>

        <button className="end-game-button" onClick={playAgain}>
          <img
            className="reload-image"
            src={reload_image}
            alt="Reload Button"
          />
          PLAY AGAIN
        </button>

        <div className="quit-game-container">
          <button className="quit-game-button" onClick={quitGame}>
            QUIT
          </button>
        </div>
      </section>
    </main>
  );
}
