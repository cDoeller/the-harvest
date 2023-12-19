window.onload = function () {
  // grab start button on load of page
  const startButton = document.getElementById("start-button");

  // add listener to start button
  // call function to start the game
  startGame(); // only for testing -----> maxTime in brackets

  startButton.addEventListener("click", function () {
    //startGame(); //for testing
  });

  function startGame() {
    console.log("index.js startGame function");
    // creating a new instance of the game class
    game = new Game(20); // -----> maxTime in brackets
    // call the start game method
    game.start();
  }
};
