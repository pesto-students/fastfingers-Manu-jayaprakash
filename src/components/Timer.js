import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.props.time,
    };
  }

  countDownTimer() {
    let { time } = this.props;
    console.log("time:" + this.state.timeLeft);
    return time;
  }

  // formatTimeLeft = (time) => {
  //   const seconds = (time / 1000).toFixed(2);
  //   return `${seconds.replace(".", ":")}`;
  // };
  render() {
    const { time } = this.props;
    return <div>{this.countDownTimer()}</div>;
  }
}
