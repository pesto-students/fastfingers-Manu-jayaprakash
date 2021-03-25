import React from "react";
import {
  SessionKeys,
  getNameOfCurrentUserScores,
  getHighScore,
} from "./util";

export default function ScoreBoard() {
  const playerName = sessionStorage.getItem(SessionKeys.PLAYERNAME);
  const currentUserScores = sessionStorage.getItem(
    getNameOfCurrentUserScores(playerName)
  );

  const formatScore = (scoreValue)=>{
    var date = new Date(0);
    date.setSeconds(scoreValue); 
    var timeString = date.toISOString().substr(14, 5);
    return timeString;
  }

  const currentUserScoresArray = currentUserScores.trim().split(" ");

  const highestScore = getHighScore();
  const scoreBoardContent = currentUserScores ? (
    <ul className="score-list">
      {currentUserScoresArray.map((score, index) => (
        <li
          key={index}
          className={`${highestScore === Number(score) ? "highest-score" : ""}`}
        >
          {`Game ${index + 1} : ${formatScore(score)}`}
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div className="scoreboard-inside">
      <h1 className="score-title">SCORE BOARD</h1>
      {scoreBoardContent}
    </div>
  );
}
