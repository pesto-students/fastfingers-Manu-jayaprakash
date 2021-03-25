import React, { useState, useEffect, useRef } from "react";
import keypad_image from "../assets/keypad.png";
import player_image from "../assets/player.png";
import { SessionKeys, GameLevel } from "./util";

export default function ResultHeader({ difficulty, isGameOver, isGamePage,displayHeder }) {
  const userName = sessionStorage.getItem(SessionKeys.PLAYERNAME);
  const currentScore = sessionStorage.getItem(SessionKeys.PRESENTSCORE) ?? 0;

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
          </div>
        </header>
      ) : null }
    </>
  );
}
