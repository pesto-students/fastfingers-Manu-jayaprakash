import React from "react";
import "./styles.css";
import HomePage from "./components/Homepage";
import GamePage from "./components/GamePage";
import GameEnd from "./components/GameEnd";
import GamePageHeader from "./components/GamePageHeader";
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
        <GamePageHeader/> 
        <GamePage />
      </Route>
      <Route path="/end">
        <GameEnd />
      </Route>
    </div>
  );
}

export default App;
