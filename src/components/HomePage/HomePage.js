import React, { useState, useEffect } from "react";
import keyboard_image from "../../assets/keyboard.png";
import play_image from "../../assets/play.png";
import GamePage from "../GamePage/GamePage";
import Header from "../Header";
import { GameLevel, getNameOfCurrentUserScores, SessionKeys } from "../util.js";

const initSessionStorage = (playerName, gameLevel) => {
  sessionStorage.setItem(SessionKeys.PLAYERNAME, playerName);
  sessionStorage.setItem(SessionKeys.SELECTEDGAMELEVEL, gameLevel);
  sessionStorage.setItem(getNameOfCurrentUserScores(playerName), "");
};

export default function HomePage() {
  const [playerName, setplayerName] = useState("");
  const [gameLevel, setgameLevel] = useState(GameLevel.EASY);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayHeder, setDisplayHeder] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const SelectedGameLevel = sessionStorage.getItem(
    SessionKeys.SELECTEDGAMELEVEL
  );

  const playerNameRef = React.createRef();

  const onPlayClick = () => {
    if (playerName) {
      initSessionStorage(playerName, gameLevel);
      setIsPlaying(true);
    } else {
      playerNameRef.current.focus();
      isError();
    }
  };

  const hideHeader = () => {
    setDisplayHeder(!displayHeder);
  };
  const isError = () => {
    setErrorMessage("Please Provide You Name");
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return isPlaying ? (
    <div>
      <Header
        difficulty={SelectedGameLevel}
        isGamePage={true}
        displayHeder={displayHeder}
      />
      <GamePage hideHeader={hideHeader} />
    </div>
  ) : (
    <div className="home-container">
      <img className="keyboard-image" src={keyboard_image} alt="keyboard"></img>

      <h1 className="home-title">fast fingers</h1>
      <div className="home-description">
        <hr className="home-line" />
        <p className="home-description-text">the ultimate typing game</p>
        <hr className="home-line" />
      </div>

      <input
        type="text"
        className="text-input"
        value={playerName}
        placeholder="TYPE YOUR NAME"
        onChange={(event) => {
          setplayerName(event.target.value);
          setErrorMessage("");
        }}
        ref={playerNameRef}
        required
      />
      <div className="home-error">{errorMessage}</div>
      {/*<div className="selectDiv">*/}
        <select
          className="home-selection"
          value={gameLevel}
          onChange={(event) => {
            let value = Array.from(
              event.target.selectedOptions,
              (option) => option.value
            );
            setgameLevel(value);
          }}
        >
          <option value={GameLevel.EASY}>{GameLevel.EASY}</option>
          <option value={GameLevel.MEDIUM}>{GameLevel.MEDIUM}</option>
          <option value={GameLevel.HARD}>{GameLevel.HARD}</option>
        </select>
      {/*</div>*/}

      <button className="start-button" onClick={onPlayClick}>
        START GAME
      </button>
    </div>
  );
}
