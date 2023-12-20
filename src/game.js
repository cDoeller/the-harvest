class Game {
  constructor(maxTime) {
    this.startScreen = document.getElementById("start-window");
    this.gameScreen = document.getElementById("game-window");
    this.endScreen = document.getElementById("end-window");

    // targets
    this.targets = [];
    this.targetID = 0;
    this.targetAmount = 10;
    this.scaleFacotrs = [5, 15, 25]; // possible scale factors
    this.maxSpeed = 1.2;
    this.minSpeed = 0.5;
    this.spawnTargetBottom = 100; // spawning always at same y height

    // general game mechanics
    this.countdown = maxTime;
    this.gameIsOver = false;

    // scores for different sizes + penalty
    this.score = 0;
    this.penaltyVanish = 5;
    this.scoreSmall = 15;
    this.scoreMedium = 10;
    this.scoreLarge = 5;

    // global ID for interval
    this.intervalID;
  }

  start() {
    console.log("game.js start function");
    // hide the start screen, show game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    // display time in very beginning
    this.displayTime();

    // spawn initial targets
    this.spawnTargtes(this.targetAmount);

    // start interval for countdown
    this.intervalID = setInterval(() => {
      this.countdown--;
      this.displayTime();
      //console.log(this.countdown);
    }, 1000);

    // Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    // stop when countdown === 0
    if (this.countdown <= 0) {
      console.log("time is up");
      console.log(this.targets);
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
    // loop through all targets
    // 1. move up
    // 2. display
    // 3. erase
    this.targets.forEach((target, index) => {
      // target gone
      if (target.isGone() === true) {
        // penalty points
        this.score -= this.penaltyVanish;
        console.log(`removed ${this.score}`);
        // delete from array
        this.targets.splice(index, 1);
        // make a replacement
        this.spawnTargtes(1);
        // no further displaying for this target --> escape
        return;
      }
      // target hit (balloon)
      if (target.balloonIsHit === true) {
        // score points
        if (target.scaleFactor === this.scaleFacotrs[0])
          this.score += this.scoreSmall;
        if (target.scaleFactor === this.scaleFacotrs[1])
          this.score += this.scoreMedium;
        if (target.scaleFactor === this.scaleFacotrs[2])
          this.score += this.scoreLarge;
        console.log(`balloon hit ${this.score}`);
        target.balloonIsHit = false;
        // make new target
        this.spawnTargtes(1);
      }
      // target hit (broccoli)
      if (target.broccoliIsHit === true) {
        // penalty points
        this.score -= this.penaltyVanish;
        console.log(`broccoli hit ${this.score}`);
        target.broccoliIsHit = false;
      }
      // MOVE or GROW
      if (target.positionY < this.spawnTargetBottom && target.targetRising === false) {
        // change to growing image
        target.growInGround(target.targetNumber);
      } else {
        // move up or down
        target.moveTarget();
      }
      // display
      target.displayTarget();
    });

    this.displayScore();
  }

  displayScore() {
    const scoreH1 = document.getElementById("score");
    let scoreString = "";
    if (this.score < 1000 && this.score >= 100) {
      scoreString = `0${Math.abs(this.score)}`;
      scoreH1.style.color = "rgb(0, 0, 137)";
    } else if (this.score < 100 && this.score >= 10) {
      scoreString = `00${Math.abs(this.score)}`;
      scoreH1.style.color = "rgb(0, 0, 137)";
    } else if (this.score < 10 && this.score >= 0) {
      scoreString = `000${Math.abs(this.score)}`;
      scoreH1.style.color = "rgb(0, 0, 137)";
    } else if (this.score < 0 && this.score > -10) {
      scoreString = `000${Math.abs(this.score)}`;
      scoreH1.style.color = "red";
    } else if (this.score <= -10 && this.score >= -100) {
      scoreString = `00${Math.abs(this.score)}`;
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

  spawnTargtes(amount) {
    // constructor(
    //   spawnPositionX,
    //   spawnPositionY,
    //   scaleFactor, ------> [0.5, 1, 1.5]
    //   speed,
    //   targetNumber
    // )
    for (let i = 0; i < amount; i++) {
      // define random Properties of targets
      // get random scale factor (size of target)
      const randScaleFactorIndex = Math.floor(Math.random() * 3);
      const currentScaleFacotr = this.scaleFacotrs[randScaleFactorIndex];
      console.log(`current factor: ${currentScaleFacotr}`);
      // get a random spawn position only in window width, at certain Y height above ground
      const randSpawnPosX =
        Math.random() * (window.innerWidth - currentScaleFacotr * 4);
      // get random speed: Math.random() * (max - min) + min;
      const randSpeed =
        Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
      console.log(`speed: ${randSpeed}`);

      // make the targets and put in array
      const tempTarget = new Target(
        randSpawnPosX,
        this.spawnTargetBottom,
        currentScaleFacotr,
        randSpeed,
        this.targetID
      );
      tempTarget.makeTarget();
      this.targets.push(tempTarget);
      // increase target number
      this.targetID++; // ****
    }
  }

  endGame() {
    console.log("game.js end function");
  }
}
