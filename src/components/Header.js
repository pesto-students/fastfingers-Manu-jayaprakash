import React, { useState, useEffect, useRef } from "react";
import keypad_image from "../assets/keypad.png";
import player_image from "../assets/player.png";
import { SessionKeys, GameLevel } from "./util";

export default function Header({ difficulty, isGameOver, isGamePage,displayHeder }) {
  const userName = sessionStorage.getItem(SessionKeys.PLAYERNAME);
  const currentScore = sessionStorage.getItem(SessionKeys.PRESENTSCORE) ?? 0;

  const [score, setScore] = useState(0);
  const timerLogicRef = useRef();
  timerLogicRef.current = () => {
    setScore(score + 1);
  };

  useEffect(() => {
    let timeId
    if (displayHeder) {
       timeId = setInterval(() => {
        timerLogicRef.current();
      }, 1000);

      return () => {
        clearInterval(timeId);
        localStorage.setItem("score", score );
      };
    }
      setScore(0);
  });

  const showScore = () => {
    var date = new Date(0);
    date.setSeconds(score); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  };

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(SessionKeys.PRESENTSCORE);
    };
  }, []);

  return (
    <>
      {displayHeder ? (
        <header className="header-info">
          <div className="game-info">
            <div className="game-player-info">
              <img
                className="game-info-image"
                src={player_image}
                alt="player icon"
              />
              <span className="player-name-game-level">{userName}</span>
            </div>

            <div className="game-player-info">
              <img
                className="game-info-image"
                src={keypad_image}
                alt="keypad icon"
              />
              <span className="player-name-game-level">{`Level: ${difficulty}`}</span>
            </div>
          </div>

          <div className="game-info">
            <div className="game-name-text">fast fingers</div>
            {isGameOver ? null : (
              <div className="game-score-text">SCORE: {showScore()}</div>
            )}
          </div>
        </header>
      ) : null }
    </>
  );
}
