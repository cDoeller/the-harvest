class Game {
  constructor(maxTime) {
    this.startScreen = document.getElementById("start-window");
    this.gameScreen = document.getElementById("game-window");
    this.endScreen = document.getElementById("end-window");

    this.targets = [];
    this.targetNumber = 0;
    this.scaleFacotrs = [5,12,20]; // possible scale factors
    this.maxSpeed = 2;
    this.minSpeed = 1;
    this.spawnTargetBottom = 200; // spawning always at same y height
    this.score = 0;
    this.countdown = maxTime;
    this.gameIsOver = false;

    // scores for different sizes + penalty
    this.penaltyVanish = 5;
    this.scoreSmall = 15;
    this.scoreMedium = 10;
    this.scoreLarge = 15;

    // global ID for interval
    this.intervalID;
    this.displayTime(); // display time in beginning
  }

  start() {
    console.log("game.js start function");
    // hide the start screen, show game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    // MAKE INITIAL TARGETS
    // constructor(
    //   spawnPositionX,
    //   spawnPositionY,
    //   scaleFactor, ------> [0.5, 1, 1.5]
    //   speed,
    //   targetNumber
    // )
    // get random scale factor
    const randScaleFactorIndex = Math.floor(Math.random() * 3);
    const currentScaleFacotr = this.scaleFacotrs[randScaleFactorIndex];
    console.log (`current factor: ${currentScaleFacotr}`);
    // get a random spawn position
    // only in window width, at certain Y height above ground
    const randSpawnPosX = Math.random() * (window.innerWidth-(currentScaleFacotr*4));
    // get random speed
    // Math.random() * (max - min) + min;
    const randSpeed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed; 
    console.log (`speed: ${randSpeed}`);
    // increase target number
    this.targetNumber = 0; // **** 
    // make the targets and put in array
    this.targets[0] = new Target(randSpawnPosX, this.spawnTargetBottom, currentScaleFacotr, randSpeed, this.targetNumber);
    this.targets[0].makeTarget();

    // start interval for countdown
    this.intervalID = setInterval(() => {
      this.countdown--;
      this.displayTime();
      console.log(this.countdown);
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
        this.score -= this.penaltyVanish;
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

  displayTime() {
    const timeH1 = document.getElementById("time");
    let timeString = "";
    if (this.countdown < 100 && this.countdown >= 10) {
      timeString = `0:${this.countdown}`;
    } else if (this.countdown < 10 && this.countdown > 0) {
      timeString = `0:0${this.countdown}`;
    } else if (this.countdown <= 0) {
      timeString = `0:00`;
    }
    timeH1.innerHTML = `${timeString}`;
  }

  endGame() {
    console.log("game.js end function");
  }
}
