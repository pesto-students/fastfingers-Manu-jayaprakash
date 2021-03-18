import React, { Component } from "react";
import Logo from "../images/logo.png";
import Input from "./Input";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      // localData: {
      //   userName: "",
      //   gameHistory: [],
      // },
    };
  }
  handleStartGame = () => {
    let gameData = JSON.parse(localStorage.getItem("gameData") || "[]");
    if (gameData.length < 1) {
      gameData.push({ userName: this.state.userName, gameHistory: [] });
    } else {
      for (let i of gameData) {
        if (i.userName === this.state.userName) {
          localStorage.setItem("activeUser", this.state.userName);
          window.location = window.location.origin+ "/game"
          return;
        }
      }
      gameData.push({ userName: this.state.userName, gameHistory: [] });
    }
    localStorage.setItem("gameData", JSON.stringify(gameData));
    localStorage.setItem("activeUser", this.state.userName);
    window.location = window.location.origin+ "/game"
  };
  handleUserName = (e) => {
    this.setState({
      userName: e.target.value,
    });
    console.log(this.state.localData);
  };
  render() {
    return (
      <div className="container home-page-wrapper">
        <img src={Logo} alt="" className="logo" />
        <p className="heading-text">fast fingers</p>
        <p className="sub-text">
          <span>the ultimate typing game</span>
        </p>
        <div className="form">
          <Input
            type="text"
            className="user-input"
            placeholder="TYPE YOUR NAME"
            handleUserName={this.handleUserName}
          />
          <select className="game-difficulty">
            <option hidden>DIFFICULTY LEVEL</option>
            <option>Easy</option>
            <option value="">Medium</option>
            <option value="">Hard</option>
          </select>
          <Input
            type="button"
            value="START GAME"
            className="start-btn"
            handleStartGame={this.handleStartGame}
          />
        </div>
      </div>
    );
  }
}
