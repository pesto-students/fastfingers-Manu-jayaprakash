import React, { useEffect, useState, useRef } from "react";

export default function Timer({ time, word }) {
  const [initialTime, setTime] = useState(time);
  // const countRef = useRef();
  let [count, setCount] = useState(time);
  useEffect(() => {
    localStorage.setItem("score", 0);
    setCount(time);
    const timeId = setInterval(() => {
      setCount((c) => {
        // c is the most recent count state
        if (c > 1) {
          return c - 1;
        }
        clearInterval(timeId);
        setCount(0);
        // gameStatus();
        // alert("over")
        window.location.pathname = "/end";
      });
    }, 10);

    return () => {
      clearInterval(timeId);
    };
  }, [time, word]);

  const formatTimeLeft = () => {
    // console.log("timeee:" + initialTime);
    return time === 0 ? "0:00" : (count / 100).toFixed(2).replace(/\./g, ":");
    // : (count / 100).toFixed(2).replace(/\./g, ":").replace(/\-/g, "");
  };

  return <div className="game-timer">{formatTimeLeft()}</div>;
}
