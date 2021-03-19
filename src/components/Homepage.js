import React, { Component } from "react";
import Logo from "../images/logo.png";
import Input from "./Input";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      difficultyLevel: "",
    };
  }
  handleStartGame = (event) => {
    event.preventDefault();
    let gameData = JSON.parse(localStorage.getItem("gameData") || "[]");
    if (gameData.length < 1) {
      gameData.push({ userName: this.state.userName, gameHistory: [] });
    } else {
      for (let i of gameData) {
        if (i.userName === this.state.userName) {
          localStorage.setItem("activeUser", this.state.userName);
          localStorage.setItem("level", this.state.difficultyLevel);
          window.location = window.location.origin + "/game";
          return;
        }
      }
      gameData.push({ userName: this.state.userName, gameHistory: [] });
    }
    localStorage.setItem("gameData", JSON.stringify(gameData));
    localStorage.setItem("activeUser", this.state.userName);
    localStorage.setItem("level", this.state.difficultyLevel);
    window.location = window.location.origin + "/game";
  };
  handleUserName = (e) => {
    this.setState({
      userName: e.target.value,
    });
    console.log(this.state.userName);
  };
  handleDifficultyLevel = (e) => {
    this.setState({
      difficultyLevel: e.target.value,
    });
    console.log(this.state.difficultyLevel);
  };
  render() {
    return (
      <div className="container home-page-wrapper">
        <img src={Logo} alt="" className="logo" />
        <p className="heading-text">fast fingers</p>
        <p className="sub-text">
          <span>the ultimate typing game</span>
        </p>
        <form className="form" onSubmit={this.handleStartGame}>
          <Input
            type="text"
            className="user-input"
            placeholder="TYPE YOUR NAME"
            handleUserName={this.handleUserName}
            required="required"
          />
          <select className="game-difficulty"  onChange={this.handleDifficultyLevel} value={this.state.difficultyLevel} required>
            <option hidden>DIFFICULTY LEVEL</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <Input type="submit" value="START GAME" className="start-btn" />
        </form>
      </div>
    );
  }
}
