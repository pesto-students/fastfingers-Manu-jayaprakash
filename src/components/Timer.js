import React, { useState, useEffect } from "react";
import { SessionKeys, GameLevel } from "./util";
import {
  secondsToMilliseconds,
  calculateCircleDasharray,
  calculateRemainingPathColor,
  formatTimeLeft
} from "./util";

export default function Timer({ duration, difficultyFactor, onTimeOut }) {
  const currentScore = sessionStorage.getItem(SessionKeys.PRESENTSCORE) ?? 0;
  const timeinMillisec = secondsToMilliseconds(duration);

  const [remainingTime, setRemainingTime] = useState(timeinMillisec);
  const [circleDasharray, setCircleDasharray] = useState(
    calculateCircleDasharray(timeinMillisec, remainingTime)
  );

  const [remainingPathColor, setRemainingPathColor] = useState(
    calculateRemainingPathColor(timeinMillisec, remainingTime)
  );

  let timerInterval = null;

  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 2);
      }
    }, 1);
  };

  const updateScore = () => {
    const timeTakenForWord = Math.floor(timeinMillisec - remainingTime);
    const timeTakenInSeconds = Number((timeTakenForWord / 1000).toFixed(2));
    const newScore = (Number(currentScore) + (timeinMillisec/1000)).toFixed(2);
    if(timeTakenInSeconds > 0 && remainingTime > 0) {
      return newScore;
    }
    return 0;
  };

  const setNewTimeAndResetTimer = (newTime) => {
    setRemainingTime(secondsToMilliseconds(newTime));
    clearInterval(timerInterval);
  };

  useEffect(() => {
    sessionStorage.setItem(SessionKeys.PRESENTSCORE, updateScore());
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setNewTimeAndResetTimer(duration);
    startTimer();
    
  }, [difficultyFactor]);

  useEffect(() => {
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setRemainingPathColor(
      calculateRemainingPathColor(timeinMillisec, remainingTime)
    );

    if (remainingTime <= 0) {
      setNewTimeAndResetTimer(0);
      onTimeOut();
    }
    
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setNewTimeAndResetTimer(0);
    } else {
      startTimer();
    }
    return () => {
      setNewTimeAndResetTimer(0);
    };
  }, []);

  return (
    <div className="countdown-container">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            strokeDasharray={circleDasharray}
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="coundown-label">
        {formatTimeLeft(remainingTime)}
      </span>
    </div>
  );
}

