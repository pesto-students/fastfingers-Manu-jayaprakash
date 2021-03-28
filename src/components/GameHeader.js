import React, { useState, useEffect } from "react";
import {
  DIFFICULTY_LEVELS,
  getDifficultylevelByText,
  formatScore,
} from "../utils/util";

export default function GameHeader({ isPlaying }) {
  const [score, setScore] = useState(0);
  const scoreHistory = JSON.parse(localStorage.getItem("score"));

  let timer = null;
  const startScoreTimer = () => {
    timer = setInterval(() => setScore((prevScore) => prevScore + 1), 1000);
  };
  useEffect(() => {
    if (isPlaying === true) {
      startScoreTimer();
    }
    if (isPlaying === false) {
      clearInterval(timer);
      timer = null;
      scoreHistory.push(score)
      localStorage.setItem("score", JSON.stringify(scoreHistory));
    }
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying]);

  const displayScorebasedOnPage = () => {
    if (isPlaying) {
      return <p className="score">SCORE : {formatScore(score).replace(".", ":")}</p>;
    }
    return <p></p>;
  };

  return (
    <header className="container-fluid">
      <div>
        <p className="playerName">{localStorage.getItem("user")}</p>
        <p className="gameLevel">
          {getDifficultylevelByText(localStorage.getItem("level"))}
        </p>
      </div>
      <div>
        <p className="gamename">Fast Fingers</p>
        {displayScorebasedOnPage()}
      </div>
    </header>
  );
}
