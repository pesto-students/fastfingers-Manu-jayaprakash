import React from "react";
import "./styles.css";
import HomePage from "./components/Homepage";
import GamePage from "./components/GamePage";
import Route from "./Route";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <div className="App-homePage-wrapper">
          <HomePage />
        </div>
      </Route>
      <Route path="/game">
        <GamePage />
      </Route>
    </div>
  );
}

export default App;
