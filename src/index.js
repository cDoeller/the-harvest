window.onload = function () {
  // grab start button on load of page
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  // add listener to start button
  // call function to start the game
  startGame(false); // only for testing

  startButton.addEventListener("click", function () {
    startGame(false); // (isRestarting)
  });
  restartButton.addEventListener("click", function () {
    const endScreen = document.getElementById("end-window");
    endScreen.style.display = "none";
    startGame(true);
  });

  function startGame(isRestarting) {
    // creating a new instance of the game class
    game = new Game(2); // -----> maxTime in brackets
    // call the start game method
    game.start(isRestarting);
  }
};
