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
      userInput: "",
      gameStatus: true
    };
  }

  componentDidMount() {
    if(localStorage.getItem("activeUser")){
      const word = this.getCurrentWord(this.state.difficultyLevel);
      console.log(word);
      this.setState({
        currentWord: word,
      });
      this.initialiseDifficultyFactor(word);
    }else{
      window.location = window.location.origin + "";
    }

  }
  getCurrentWord(level=this.state.difficultyLevel) {
    if (level === "Easy") {
      const disc = Dictionary.filter(function (word) {
        return word.length <= 4;
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
  initialiseDifficultyFactor(word) {
    const { difficultyLevel } = this.state;
    if (difficultyLevel === "Easy") {
      this.setState({
        difficultyFactor: 1,
      });
      this.initialiseTimer(word, 1);
    } else if (difficultyLevel === "Medium") {
      this.setState({
        difficultyFactor: 1.5,
      });
      this.initialiseTimer(word, 1.5);
    } else {
      this.setState({
        difficultyFactor: 2,
      });
      this.initialiseTimer(word, 2);
    }
  }
  initialiseTimer(word, difficulty) {
    this.setState({
      timer: word.length / difficulty,
    });
  }
  handleInput = (e) => {
    this.setState({
      userInput: e.target.value,
    });
    console.log(e.target.value.toUpperCase());
    if(this.state.currentWord.toUpperCase() === e.target.value.toUpperCase()){
      console.log("match");
      const nextWord = this.getCurrentWord();
      this.setState({
        currentWord: nextWord,
      });
      console.log(nextWord);
      this.initialiseDifficultyFactor(nextWord);
      this.setState({
        userInput:""
      })
    }
  };
  stopGame=()=>{
    window.localStorage.setItem("activeUser","")
    window.localStorage.setItem("score","")
    window.location.pathname=""
  }
  isGameEnded = ()=>{
    this.setState({
      gameStatus :false
    })
  }

  render() {
    const { currentWord, timer, userInput, gameStatus} = this.state;
    const wordMatch = currentWord.split("").map((letter, index) => {
      if (index < userInput.length) {
        if (letter.toUpperCase() === userInput[index].toUpperCase()) {
          return (
            <span key={index} className="match">
              {letter.toUpperCase()}
            </span>
          );
        } else if (letter.toUpperCase() !== userInput[index].toUpperCase()) {
          return (
            <span key={index} className="notMatch">
              {letter.toUpperCase()}
            </span>
          );
        }
      }

      return <span key={index}>{letter.toUpperCase()}</span>;
    });
    return (
      <div>
        <Scoreboard />
        <Input type="button" value="STOP GAME" className="stop-btn" onClick={this.stopGame}/>
        <div className="gameArea">
          <Timer time={Math.max(2,timer)*100} word={currentWord} gameStatus={this.isGameEnded}/>
          <label className="gameWord">{wordMatch}</label>
          <Input
            className="gameInput"
            type="text"
            value={userInput}
            handleInput={this.handleInput}
          ></Input>
        </div>
      </div>
    );
  }
}
