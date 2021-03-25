import React, { useState, useEffect, useRef } from "react";

export default function GamePageHeader() {
  const [score, setScore] = useState(0);
  const timerLogicRef = useRef();
  timerLogicRef.current = () => {
    setScore(score + 1);
  };
  useEffect(() => {
    if (window.location.pathname === "/game") {
      const timeId = setInterval(() => {
          timerLogicRef.current();
      }, 1000);

      return () => {
        clearInterval(timeId);
        localStorage.setItem("score", score+1)
      };
    }
  });

  const showScore = () => {
    if (window.location.pathname === "/game") {
      var date = new Date(0);
      date.setSeconds(score); // specify value for SECONDS here
      var timeString = date.toISOString().substr(11, 8);
      return timeString;
    }
  };
  return (
    <header className="container-fluid">
      <div>
        <p className="playerName">{localStorage.getItem("activeUser")}</p>
        <p className="gameLevel">{localStorage.getItem("level")}</p>
      </div>
      <div>
        <p>fast fingers</p>
        <p>{showScore()}</p>
      </div>
    </header>
  );
}
