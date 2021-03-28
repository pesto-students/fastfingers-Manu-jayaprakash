import dictionary from "../data/dictionary.json";

export const DIFFICULTY_LEVELS = {
  1: "EASY",
  1.5: "MEDIUM",
  2: "HARD",
};
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 50;
const ALERT_THRESHOLD = 25;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

export const getRandomWord = (difficulty) => {
  if (difficulty < 1.5) {
    const disc = dictionary.filter(function (word) {
      return word.length <= 4;
    });
    return disc[Math.floor(Math.random() * disc.length)];
  }
  if (difficulty < 2) {
    const disc = dictionary.filter(function (word) {
      return word.length >= 5 && word.length <= 8;
    });
    return disc[Math.floor(Math.random() * disc.length)];
  }
  if (difficulty >= 2) {
    const disc = dictionary.filter(function (word) {
      return word.length > 8;
    });
    return disc[Math.floor(Math.random() * disc.length)];
  }
};

const MIN_DURATION = 2;
export const calculateTime = (randomWord, difficultyFactor) => {
  let timeCalculated = Math.ceil(randomWord.length / difficultyFactor);

  return Math.max(MIN_DURATION, timeCalculated);
};

export const calculateCircleDasharray = (duration, remainingTime) => {
  return `${(
    calculateTimeFraction(duration, remainingTime) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
};

const calculateTimeFraction = (duration, remainingTime) => {
  const fraction = remainingTime / duration;
  return fraction;
};

export const calculateRemainingPathColor = (duration, timeLeft) => {
  const { alert, warning, info } = COLOR_CODES;

  const timeLeftPercent = (timeLeft / duration) * 100;

  if (timeLeftPercent <= alert.threshold) {
    return alert.color;
  } else if (timeLeftPercent <= warning.threshold) {
    return warning.color;
  }
  return info.color;
};

export const formatTimeLeft = (time) => {
  let seconds = Math.floor(time / 1000);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let milliseconds = Math.round((time % 1000) / 10);
  if (milliseconds < 10) {
    milliseconds = `0${milliseconds}`;
  }

  return `${seconds}:${milliseconds}`;
};

export const getDifficultylevelByText = (difficulty) => {
  if (difficulty < 1.5) {
    return "EASY";
  }
  if (difficulty < 2) {
    return "MEDIUM";
  }
  if (difficulty >= 2) {
    return "HARD";
  }
};

export const formatScore = (score) => {
    let minutes = parseInt(score / 60);
    let seconds = parseInt(score % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const finalScore = `${minutes}.${seconds}`;
    return finalScore;
  };

  // For mobile Responsive behaviour
  // Manipulating DOM as react component doesnt have any dependency over body
  export const addClasstoBody = (newClass) =>{
    document.body.classList.add(newClass);
  }
  export const removeClassfromBody = (removeClass) =>{
    document.body.classList.remove(removeClass);
  }
