import React, { useState } from "react";
import Logo from "../images/logo.png";

export default function HomePage({ changePage }) {
  const [userName, setUsername] = useState(localStorage.getItem("user") || "");
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const playerNameRef = React.createRef();

  const handleStartGame = (e) => {
    e.preventDefault();
    if (userName) {
      localStorage.setItem("user", userName);
      localStorage.setItem("level", difficultyLevel);
      localStorage.setItem("score", JSON.stringify([]));
      changePage("/game");
      console.log("game started");
    }else{
        isError();
    }
  };

  const isError = () => {
    setErrorMessage("Please Provide You Name");
  };

  return (
    <div>
      <div className="container home-page-wrapper">
        <img src={Logo} alt="" className="logo" />
        <p className="heading-text">fast fingers</p>
        <p className="sub-text">
          <span>the ultimate typing game</span>
        </p>
        <form className="form" onSubmit={handleStartGame}>
          <input
            type="text"
            id="playerName"
            name="playerName"
            autoComplete= "off"
            value={userName}
            placeholder="TYPE YOUR NAME"
            ref={playerNameRef}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage("");
            }}
          />
          <div className="home-error">{errorMessage}</div>
          <select
            name="difficultyLevel"
            id="difficultyLevel"
            value={difficultyLevel}
            onChange={(event) => {
              setDifficultyLevel(event.target.value);
            }}
          >
            <option value="1">EASY</option>
            <option value="1.5">MEDIUM</option>
            <option value="2">HARD</option>
          </select>

          <button value="start game" type="submit" className="start-btn">
            start game
          </button>
        </form>
      </div>
    </div>
  );
}
