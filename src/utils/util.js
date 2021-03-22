function playAgain() {
  window.location.pathname = "/game";
}
function stopGame() {
  window.localStorage.setItem("activeUser", "");
  window.localStorage.setItem("score", "");
  window.location.pathname = "";
}

export default {playAgain, stopGame}