window.onload = function () {
  // grab start button on load of page
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  // to check if restart button has been clicked
  let isRestarting = false;
  let name = "";

  // testing: call function to start the game
  //startGame(); 

  startButton.addEventListener("click", function () {
    let inputElement = document.getElementById("name-input");
    // get name from input
    name = inputElement.value.toUpperCase();
    if (name === "") name = "unknown"
    startGame(); 
  });

  restartButton.addEventListener("click", function () {
    const endScreen = document.getElementById("end-window");
    endScreen.style.display = "none";
    isRestarting = true;
    startGame();
  });

  function startGame() {
    // creating a new instance of the game class
    game = new Game(20, name); // -----> maxTime in brackets
    // call the start game method
    game.start(isRestarting);
  }
};