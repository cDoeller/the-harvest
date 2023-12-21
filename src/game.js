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
    this.maxSpeed = 2.5;
    this.minSpeed = 0.5;
    this.spawnTargetBottom = 100; // spawning always at same y height

    // general game mechanics
    this.countdown = maxTime;
    this.gameIsOver = false;

    // scores for different sizes + penalty
    this.score = 0;
    this.balloonsHit = 0;
    this.broccolisHit = 0;
    this.clickCount = 0;

    // global ID for interval
    this.mainIntervalID;
  }

  // ** START FUNCTION
  start() {
    console.log("game.js start function");
    // hide the start screen, show game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    // display time in first moments of game
    this.displayTime();

    // spawn initial targets
    this.spawnTargtes(this.targetAmount);

    // start interval for countdown
    this.mainIntervalID = setInterval(() => {
      this.countdown--;
      this.displayTime();
      //console.log(this.countdown);
    }, 1000);

    // add listener for entire window clicks
    window.addEventListener("mousedown", () => {
      this.clickCount++;
      console.log(this.clickCount);
    });

    // Start the game loop
    this.gameLoop();
  }

  // ** GAME LOOP FUNCTION
  gameLoop() {
    // stop when countdown === 0
    if (this.countdown <= 0) {
      console.log("time is up");
      //console.log(this.targets);
      this.gameIsOver = true;
      clearInterval(this.mainIntervalID);
    }

    // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
    if (this.gameIsOver) {
      this.displayStats();
      //call endGame();
      return;
    }

    // update what can be seen on the game canvas
    this.updateGame();

    // 60 fps interval, continuesly calling itself (gameLoop function)
    window.requestAnimationFrame(() => this.gameLoop());
  }

  // ** UPDATE FUNCTION
  updateGame() {
    // loop through all targets
    this.targets.forEach((target, index) => {
      // ** TARGET GONE
      if (target.isGone() === true) {
        // penalty points
        this.score -= target.score;
        // delete from array
        this.targets.splice(index, 1);
        // make a replacement
        this.spawnTargtes(1);
        // --> escape to not do the other steps
        return;
      }
      // ** TARGET HIT (balloon)
      if (target.balloonIsHit === true) {
        // score points
        this.score += target.score;
        // increase targets hit
        this.balloonsHit++;
        // reset the hit flag of balloon
        target.balloonIsHit = false;
        // make new target
        this.spawnTargtes(1);
      }
      // ** TARGET HIT (broccoli)
      if (target.broccoliIsHit === true) {
        // penalty points
        this.score -= target.score;
        // increase broccoli hit
        this.broccolisHit ++;
        // reset the hit flag of broccoli
        target.broccoliIsHit = false;
      }
      // MOVE or GROW
      // if target falling down and below spawn line
      if (
        target.positionY < this.spawnTargetBottom &&
        target.targetRising === false
      ) {
        // change to growing image on spawn line
        target.growInGround();
      } else {
        // if still moving -> rise up or fall down
        target.moveTarget();
      }
      // display
      target.displayTarget();
    });
    // display score after updates
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

  // display all the stats
  displayStats() {
    const missed = this.clickCount - this.balloonsHit - this.broccolisHit;
    console.log(`your stats: \n 
    darts thrown: ${this.clickCount} \n
    targets hit: ${this.balloonsHit}\n
    broccolis hit: ${this.broccolisHit}\n
    missed darts: ${missed}`);
  }

  spawnTargtes(amount) {
    // constructor(
    //   spawnPositionX,
    //   spawnPositionY,
    //   scaleFactor, ------> [0.5, 1, 1.5]
    //   score,
    //   speed,
    //   targetNumber
    // )
    for (let i = 0; i < amount; i++) {
      // define random Properties of targets
      // get random scale factor (size of target)
      const randScaleFactorIndex = Math.floor(Math.random() * 3);
      const currentScaleFactor = this.scaleFacotrs[randScaleFactorIndex];
      // assign the score
      const currentScore = currentScaleFactor;
      // get a random spawn position only in window width, at certain Y height above ground
      const randSpawnPosX =
        Math.random() * (window.innerWidth - currentScaleFactor * 4);
      // get random speed: Math.random() * (max - min) + min;
      const randSpeed =
        Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
      //console.log(`speed: ${randSpeed}`);

      // make the targets and put in array
      const tempTarget = new Target(
        randSpawnPosX,
        this.spawnTargetBottom,
        currentScaleFactor,
        currentScore,
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
