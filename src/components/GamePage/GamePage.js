import React, { useState, useEffect, useRef } from "react";
import Word from "../Word";
import ResultPage from "../ResultPage/ResultPage";
import Header from "../Header";
import Timer from "../Timer";
import ScoreBoard from "../Scoreboard";
import stop_image from "../../assets/stop.png";
import {
  getRandomWordForCurrentLevel,
  DifficultyFactor,
  getNameOfCurrentUserScores,
  calculateDuration,
  SessionKeys,
  UpdateGameLevelByDifficultyFactor
} from "../util";

const DIFFICULTY_INCREMENT_FACTOR = 0.01;

export default function Game({hideHeader}) {
  const SelectedGameLevel = sessionStorage.getItem(
    SessionKeys.SELECTEDGAMELEVEL
  );

  sessionStorage.setItem(SessionKeys.DIFFICULTYLEVEL, SelectedGameLevel);
  const [difficulty, setDifficulty] = useState(SelectedGameLevel);
  const difficultyFactor = useRef(DifficultyFactor[difficulty]);
  const playerName = sessionStorage.getItem(SessionKeys.PLAYERNAME);
  let currentUserScores = sessionStorage.getItem(
    getNameOfCurrentUserScores(playerName)
  );
  const gameInputRef = React.createRef();

  const [userInput, setUserInput] = useState("");
  const [randomWord, setRandomWord] = useState(
    getRandomWordForCurrentLevel(difficulty)
  );
  const [duration, setDuration] = useState(
    calculateDuration(randomWord, difficultyFactor.current)
  );
  const [isPlaying, setIsPlaying] = useState(true);

  const reInitialise = () => {
    sessionStorage.setItem(SessionKeys.DIFFICULTYLEVEL, SelectedGameLevel);
    setDifficulty(SelectedGameLevel);
    difficultyFactor.current = DifficultyFactor[difficulty];
    setUserInput("");
    setRandomWord(getRandomWordForCurrentLevel(difficulty));
    setDuration(calculateDuration(randomWord, difficultyFactor.current));
  };

  const updateDifficultyFactor = () => {
    difficultyFactor.current += DIFFICULTY_INCREMENT_FACTOR;
    const revisedDifficulty = UpdateGameLevelByDifficultyFactor(
      difficultyFactor.current
    );
    if (revisedDifficulty !== difficulty) {
      setDifficulty(revisedDifficulty);
    }
    return revisedDifficulty;
  };

  const onInputCorrectWord = () => {
    const revisedDifficulty = updateDifficultyFactor();
    setRandomWord(getRandomWordForCurrentLevel(revisedDifficulty));
    setUserInput("");
    setDuration(calculateDuration(randomWord, difficultyFactor.current));
  };

  useEffect(() => {
    if (gameInputRef.current) {
      gameInputRef.current.focus();
    }
  });

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(SessionKeys.PRESENTSCORE);
    };
  }, []);

  useEffect(() => {
    if (
      userInput.length > 0 &&
      userInput.toUpperCase() === randomWord.toUpperCase()
    ) {
      onInputCorrectWord();
    }
  });

  const gameOver = () => {
    const currentScore = Number(localStorage.getItem("score"))+1 ?? 0;
    currentUserScores = `${currentUserScores} ${currentScore}`;
    sessionStorage.setItem(
      getNameOfCurrentUserScores(playerName),
      currentUserScores
    );
    hideHeader();
    setIsPlaying(false);
  };

  const playAgain = () => {
    reInitialise();
    hideHeader();
    setIsPlaying(true);
  };

  return !isPlaying ? (
    <ResultPage playAgain={playAgain} />
  ) : (
    <main>

      <section className="game-body-section">
        <aside className="score-side-section">
          <section className="scoreboard-section">
            <ScoreBoard />
          </section>
          <button className="stop-button" onClick={gameOver}>
            <img
              className="stop-image"
              src={stop_image}
              alt="Stop Game Button"
            />
            Stop Game
          </button>
        </aside>

        <div className="game-content">
            <Timer
              duration={duration}
              difficultyFactor={difficultyFactor.current}
              onTimeOut={gameOver}
            />

          <div className="game-word">
            <Word currentWord={randomWord} currentInput={userInput} />
          </div>

          <input
            className="text-input game-text-input"
            type="text"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            ref={gameInputRef}
            required
          />
        </div>
      </section>
    </main>
  );
}