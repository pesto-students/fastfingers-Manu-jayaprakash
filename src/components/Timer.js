import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);

  }
  formatTimeLeft = (time) => {
    const seconds = (time / 1000).toFixed(2);
    return `${seconds.replace(".", ":")}`;
  };
  
  componentDidMount() {
    // console.log(this.state.timeLeft);
    // const now = new Date();
    // console.log(now.getTime())
  }

  render() {
    return <div>{this.formatTimeLeft(3000)}</div>;
  }
}
