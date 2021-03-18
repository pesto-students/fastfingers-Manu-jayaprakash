import React, { Component } from "react";
import GamePageHeader from "./GamePageHeader";
import Scoreboard from "./Scoreboard";
import Input from "./Input";
import Timer from "./Timer";
import Dictionary from "../data/dictionary.json";

export default class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: 1,
      currentWord: "",
      currentScore: 0,
    };
  }

  componentDidMount() {
    console.log(Dictionary);
    const test = this.getCurrentWord(3)
    console.log(test)
  }
  getCurrentWord(level) {
    if (level <= 1) {
      const disc = Dictionary.filter(function(word){
        return word.length<=4
      });
      return disc[Math.floor(Math.random() * disc.length)];
    }

    if (level > 1 && level <= 2) {
      const disc = Dictionary.filter(
        (word) => word.length >= 5 && word.length <= 8
      );
      return disc[Math.floor(Math.random() * disc.length)].toUpperCase();
    }

    if (level > 2) {
      const disc = Dictionary.filter((word) => word.length > 8);
      return disc[Math.floor(Math.random() * disc.length)].toUpperCase();
    }
  }
  render() {
    return (
      <div>
        <GamePageHeader />
        <Scoreboard />
        <Input type="button" value="STOP GAME" className="stop-btn" />
        <div className="gameArea">
          <Timer />
          <label className="gameWord">Wordszvzc</label>
          <Input className="gameInput"> type="text"</Input>
        </div>
      </div>
    );
  }
}
