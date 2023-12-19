class Game {
  constructor(maxTime) {
    this.startScreen = document.getElementById("start-window");
    this.gameScreen = document.getElementById("game-window");
    this.endScreen = document.getElementById("end-window");

    this.targets = [];
    this.score = 0;
    this.countdown = maxTime;
    this.gameIsOver = false;

    // scores for different sizes + penalty
    this.penalty = 5;
    this.scoreSmall = 15;
    this.scoreMedium = 10;
    this.scoreLarge = 15;

    // global ID for interval
    this.intervalID;
  }

  start() {
    console.log("game.js start function");
    // hide the start screen, show game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.targets[0] = new Target(600, 200, 1, 1, 1);
    this.targets[0].makeTarget();

    // start interval for countdown
    this.intervalID = setInterval(() => {
      this.countdown --;
      console.log (this.countdown);
    }, 1000);

    // Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    // stop when countdown === 0
    if (this.countdown <= 0) {
      console.log("time is up");
      this.gameIsOver = true;
      clearInterval(this.intervalID);
    }

    // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
    if (this.gameIsOver) {
      //call endGame();
      return;
    }

    // update what can be seen on the game canvas
    this.updateGame();

    // 60 fps interval, continuesly calling itself
    window.requestAnimationFrame(() => this.gameLoop());
  }

  updateGame() {
    // loop through targets
    // 1. move up
    // 2. display
    // 3. erase
    this.targets.forEach((target, index) => {
      // move
      target.moveTarget();
      // display
      target.displayTarget();
      // erase
      if (target.isGone() === true) {
        // penalty points
        this.score -= this.penalty;
        console.log(this.score);
        // delete from array
        this.targets.splice(index, 1);
        console.log("removed");
        console.log(this.targets);
      }
    });

    this.displayScore();
  }

  displayScore() {
    const scoreH1 = document.getElementById("score");
    let scoreString = "";
    if (this.score < 100 && this.score >= 10) {
      scoreString = `0${Math.abs(this.score)}`;
      scoreH1.style.color = "rgb(0, 0, 137)";
    } else if (this.score < 10 && this.score >= 0) {
      scoreString = `00${Math.abs(this.score)}`;
      scoreH1.style.color = "rgb(0, 0, 137)";
    } else if (this.score < 0 && this.score > -10) {
      scoreString = `00${Math.abs(this.score)}`;
      scoreH1.style.color = "red";
    } else if (this.score <= -10 && this.score >= -100) {
      scoreString = `0${Math.abs(this.score)}`;
      scoreH1.style.color = "red";
    }
    scoreH1.innerHTML = `SCORE ${scoreString}`;
  }

  endGame() {
    console.log("game.js end function");
  }
}
