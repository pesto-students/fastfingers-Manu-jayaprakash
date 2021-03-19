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
      difficultyLevel: localStorage.getItem("level") || "Easy",
      difficultyFactor: "",
      currentWord: "",
      currentScore: 0,
      timer: "",
    };
  }

  componentDidMount() {
    const word = this.getCurrentWord(this.state.difficultyLevel)
    console.log(word);
    this.setState({
      currentWord : word
    })
    this.initialiseDifficultyFactor(word);
  }
  getCurrentWord(level) {
    if (level === "Easy") {
      const disc = Dictionary.filter(function(word){
        return word.length<=4
      });
      return disc[Math.floor(Math.random() * disc.length)];
    }

    if (level === "Medium") {
      const disc = Dictionary.filter(
        (word) => word.length >= 5 && word.length <= 8
      );
      return disc[Math.floor(Math.random() * disc.length)].toUpperCase();
    }

    if (level === "Hard") {
      const disc = Dictionary.filter((word) => word.length > 8);
      return disc[Math.floor(Math.random() * disc.length)].toUpperCase();
    }
  }
  initialiseDifficultyFactor(word){
    const {difficultyLevel} = this.state;
    if(difficultyLevel ==="Easy"){
      this.setState({
        difficultyFactor : 1
      })
      this.initialiseTimer(word,1);
    }else if(difficultyLevel ==="Medium"){
      this.setState({
        difficultyFactor : 1.5
      })
      this.initialiseTimer(word,1.5);
    }else{
      this.setState({
        difficultyFactor : 2
      })
      this.initialiseTimer(word,2);
    }
  }
  initialiseTimer(word,difficulty){
    this.setState({
      timer: word.length / difficulty
    })
  }
  render() {
    const {currentWord,timer} = this.state;
    return (
      <div>
        <GamePageHeader />
        <Scoreboard />
        <Input type="button" value="STOP GAME" className="stop-btn" />
        <div className="gameArea">
          <Timer  time={timer}/>
          <label className="gameWord">{currentWord}</label>
          <Input className="gameInput"> type="text"</Input>
        </div>
      </div>
    );
  }
}
