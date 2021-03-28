import React, { useState, useEffect, useRef } from "react";
import GameHeader from "./GameHeader";
import Word from "./Word";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import {
  getRandomWord,
  calculateTime,
  addClasstoBody,
  removeClassfromBody,
} from "../utils/util";

export default function GamePage({ changePage }) {
  const [difficulty, setDifficulty] = useState(localStorage.getItem("level"));
  const [randomWord, setRandomWord] = useState(getRandomWord(difficulty));
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const difficultyFactor = useRef(localStorage.getItem("level"));
  const [duration, setDuration] = useState(
    calculateTime(randomWord, difficulty)
  );
  const gameInputRef = React.createRef();

  useEffect(() => {
    gameInputRef.current.focus();
    if (randomWord === userInput) {
      updateDifficultyFactor();
      setRandomWord(getRandomWord(Number(difficulty) + 0.01));
      setUserInput("");
      setDuration(calculateTime(randomWord, difficulty));
    }
  }, [userInput]);

  useEffect(() => {
    if (!isPlaying) {
      changePage("/gameEnded");
    }
  }, [isPlaying]);

  useEffect(() => {
    addClasstoBody("body-wrapper");
    return () => {
      removeClassfromBody("body-wrapper");
    };
  }, []);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const updateDifficultyFactor = () => {
    difficultyFactor.current = Number(difficultyFactor.current) + 0.01;
    setDifficulty(difficultyFactor.current);
    localStorage.setItem("level", difficultyFactor.current);
  };
  const stopGame = () => {
    setIsPlaying(false);
  };
  return (
    <div className="gamepage-wrapper">
      <GameHeader isPlaying={isPlaying} />
      <div className="main">
        <Scoreboard />
        <div className="playarea">
          <Timer
            duration={duration}
            word={randomWord}
            setIsPlaying={setIsPlaying}
          />
          <Word randonWord={randomWord} currentInput={userInput} />
          <input
            type="text"
            onChange={handleUserInput}
            value={userInput}
            ref={gameInputRef}
            className="gameInput"
          />
        </div>
      </div>
      <button onClick={stopGame} className="stop-btn">
        Stop Game
      </button>
    </div>
  );
}
