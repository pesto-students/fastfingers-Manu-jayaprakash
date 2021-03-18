import React from "react";

export default function GamePageHeader() {
  return (
    <header className="container-fluid">
      <div>
        <p className="playerName">PlayerName</p>
        <p className="gameLevel">Level</p>
      </div>
      <div>
        <p>fast fingers</p>
        <p>Score :</p>
      </div>
    </header>
  );
}
