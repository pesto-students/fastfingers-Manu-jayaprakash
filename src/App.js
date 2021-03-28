import React, { useState, useEffect } from "react";
import "./styles.css";
import Route from "./Route";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import GameResultPage from "./components/GameResultPage";

function App() {
  const [hashRoute, setHashRoute] = useState(window.location.hash);
  const [changeRoute, setchangeRoute] = useState(window.location.hash);

  useEffect(() => {
    setHashRoute(window.location.hash);
  }, [window.location.hash]);

  const changePage = (newRoute) => {
    setchangeRoute(newRoute);
    window.location.hash = newRoute;
  };
  return (
    <div className="App">
      <Route path="" currentRoute={hashRoute}>
        <HomePage changePage={changePage} />
      </Route>
      <Route path="#/game" currentRoute={hashRoute}>
        <GamePage changePage={changePage} />
      </Route>
      <Route path="#/gameEnded" currentRoute={hashRoute}>
        <GameResultPage changePage={changePage} />
      </Route>
    </div>
  );
}

export default App;
