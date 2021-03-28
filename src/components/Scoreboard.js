import React from "react";
import { formatScore } from "../utils/util";

export default function Scoreboard() {
  const scoreHistory = JSON.parse(localStorage.getItem("score"));
  const highScore = Math.max(...scoreHistory);
  const displayScore = scoreHistory.map((score, index) => {
    if (highScore === score) {
      return (
        <p key={index} className="highscore">
          Game {index + 1} : {formatScore(score)}
        </p>
      );
    }
    return (
      <p key={index}>
        Game {index + 1} : {formatScore(score)}
      </p>
    );
  });
  return (
    <div className="Scoreboard">
      <p className="Scoreboard--heading">Scoreboard</p>
      {displayScore.length ? displayScore : <p>No Record Found</p>}
      {/*<p>Game 1</p>
      <p>Game 2</p>
      <p>Game 3</p>
      <p className="Scoreboard--subheading">PERSONAL BEST</p>
      <p>Game 4</p>*/}
    </div>
  );
}
