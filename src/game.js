class Game {
  constructor(maxTime, name) {
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
    this.name = name;
    this.balloonsHit = 0;
    this.broccolisHit = 0;
    this.clickCount = 0;
    this.newHighscore = false;

    // darts
    this.maxDarts = 8;
    this.dartsLeft = 8;
    this.mustReload = false;

    // global ID for interval
    this.mainIntervalID;
  }

  start(isRestarting) {
    // hide the start screen, show game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    // check if restart and go to restart method
    if (isRestarting === true) this.restart();

    // display time in first moments of game
    this.displayTime();

    // spawn initial targets
    this.spawnTargtes(this.targetAmount);

    // start interval for countdown
    this.mainIntervalID = setInterval(() => {
      this.countdown--;
      this.displayTime();
      if (this.countdown < 4 && this.countdown != 0) {
        // sound
        const counterSound = new Audio("./sound/counter.mp3"); // counter
        counterSound.play();
      }
    }, 1000);

    // add listener for entire window clicks + reloading mechanism
    window.addEventListener("mousedown", () => {
      this.checkDarts();
      this.clickCount++;
      if (this.dartsLeft === 0 && !this.gameIsOver) {
        // sound
        const noDartsSound = new Audio("./sound/noDarts.mp3"); // no darts
        noDartsSound.play();
      } else {
        // // sound
        // const noDartsSound = new Audio("./sound/thrown.mp3"); // no darts
        // noDartsSound.play();
      }
    });

    // add listener for reloading mechanism
    window.addEventListener("keydown", () => {
      if (
        event.key === "a" &&
        !this.gameIsOver &&
        this.dartsLeft < this.maxDarts
      ) {
        this.reload();
      }
    });

    // Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    // GAME IS OVER --> stop when countdown === 0
    if (this.countdown <= 0) {
      console.log("time is up");
      //console.log(this.targets);
      this.gameIsOver = true;
      clearInterval(this.mainIntervalID);
    }
    // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
    if (this.gameIsOver) {
      this.displayStats();
      this.endGame();
      return;
    }

    // update what can be seen on the game canvas
    this.updateGame();

    // 60 fps interval, continuesly calling itself (gameLoop function)
    window.requestAnimationFrame(() => this.gameLoop());
  }

  updateGame() {
    // loop through all targets
    this.targets.forEach((target, index) => {
      // if game is not running anymore
      target.mustReload = this.mustReload;
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
        this.broccolisHit++;
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
        if (!target.growing) {
          target.growInGround();
        }
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
      scoreH1.style.color = "blue";
    } else if (this.score < 100 && this.score >= 10) {
      scoreString = `00${Math.abs(this.score)}`;
      scoreH1.style.color = "blue";
    } else if (this.score < 10 && this.score >= 0) {
      scoreString = `000${Math.abs(this.score)}`;
      scoreH1.style.color = "blue";
    } else if (this.score < 0 && this.score > -10) {
      scoreString = `000${Math.abs(this.score)}`;
      scoreH1.style.color = "red";
    } else if (this.score <= -10 && this.score >= -100) {
      scoreString = `00${Math.abs(this.score)}`;
      scoreH1.style.color = "red";
    } else if (this.score <= -100 && this.score >= -1000) {
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

  spawnTargtes(amount) {
    for (let i = 0; i < amount; i++) {
      // define random Properties of targets
      // get random scale factor (size of target)
      const randScaleFactorIndex = Math.floor(Math.random() * 3);
      const currentScaleFactor = this.scaleFacotrs[randScaleFactorIndex];
      // assign the score
      let currentScore = 0;
      if (currentScaleFactor===5)currentScore=50;
      if (currentScaleFactor===15)currentScore=25;
      if (currentScaleFactor===25)currentScore=10;
      // get a random spawn position only in window width, at certain Y height above ground
      const randSpawnPosX =
        Math.random() * (window.innerWidth - currentScaleFactor * 4);
      // get random speed: Math.random() * (max - min) + min;
      const randSpeed =
        Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
      //console.log(`speed: ${randSpeed}`);

      // make the targets and put in array
      // spawnPositionX, spawnPositionY, scaleFactor[0.5, 1, 1.5], score, speed, targetNumber
      const tempTarget = new Target(
        randSpawnPosX,
        this.spawnTargetBottom,
        currentScaleFactor,
        currentScore,
        randSpeed,
        this.targetID
      );
      // call maketarget method
      tempTarget.makeTarget();
      // add tot targets array
      this.targets.push(tempTarget);
      // increase target number
      this.targetID++; // ****
    }
  }

  checkDarts() {
    // dont do this if game is over
    if (this.gameIsOver) return;
    // decrease number of available darts
    // if empty, mustReload = 1
    if (this.dartsLeft > 0) this.dartsLeft--;
    // update the active / inactive darts
    if (this.mustReload === false) this.updateDartVisuals(false);
    // stop updating if no more darts
    if (this.dartsLeft <= 0) this.mustReload = true;
  }

  reload() {
    // sound
    const reloadSound = new Audio("./sound/reload.mp3"); // reload
    reloadSound.play();
    // update visual reloaded
    this.updateDartVisuals(true);
    // reset boolean and counter
    this.mustReload = false;
    this.dartsLeft = this.maxDarts;
    console.log(this.sound);
  }

  updateDartVisuals(shouldReload) {
    if (this.gameIsOver) return; // prevent from running when over
    const dartElements = document.getElementsByClassName("dart");
    const dartElementsArray = [...dartElements];
    if (shouldReload === false) {
      // decrease available darts visually
      dartElementsArray[this.dartsLeft].classList.remove("dart-active");
      dartElementsArray[this.dartsLeft].classList.add("dart-inactive");
    } else {
      // fully reloaded visuals
      dartElementsArray.forEach((dart) => {
        dart.classList.remove("dart-inactive");
        dart.classList.add("dart-active");
      });
    }
  }

  restart() {
    // get rid of old objects for restart game
    const targetsClasses = document.getElementsByClassName("target-container");
    let targets = [...targetsClasses];
    targets.forEach((target) => {
      target.remove();
    });
    this.targets = [];
    this.targetID = 0;
    this.score = 0;
    this.balloonsHit = 0;
    this.broccolisHit = 0;
    this.clickCount = 0;
    this.dartsLeft = 8;
    this.mustReload = false;
    this.updateDartVisuals(true);
  }

  // update highscore
  // *** fix highscore list order 
  updateHighscore() {

    let scoreList = [];
    let nameList = [];

    // grab scores from local storage
    for (let i = 0; i < 5; i++) {
      // saved as score0, score1, score2, score3, score4
      // saved as name0, name1, name2, name3, name4
      let tempScore = localStorage.getItem(`score${i}`);
      let tempName = localStorage.getItem(`name${i}`);
      if (tempScore == null) tempScore = "0";
      if (tempName == null) tempName = "n/a";
      scoreList.push(parseInt(tempScore));
      nameList.push(tempName);
    }

    // compare with current score
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i] < this.score) {
        this.newHighscore = true;
        scoreList[i] = this.score;
        nameList[i] = this.name;
        break;
      }
    }

    // push new data to local storage
    for (let i = 0; i < 5; i++) {
      localStorage.setItem(`score${i}`, scoreList[i].toString());
      localStorage.setItem(`name${i}`, nameList[i]);
    }

    // return data for display
    let returnScoreData = [];
    for (let i = 0; i < 5; i++) {
      returnScoreData[i] = [nameList[i], scoreList[i]];
    }
    return returnScoreData;
  }

  displayStats() {
    const missed = this.clickCount - this.balloonsHit - this.broccolisHit;
    return `
    <li>Darts Thrown: ${this.clickCount}</li>
    <li>Balloons Hit: ${this.balloonsHit}</li>
    <li>Broccolis Hit: ${this.broccolisHit}</li>
    <li>Missed Darts: ${missed}</li>
    <li>Total Score: ${this.score}</li>`;
  }

  displayHighscores() {
    let highscoreList = this.updateHighscore();
    return `
    <li>Name: ${highscoreList[0][0]}, Score: ${highscoreList[0][1]}</li>
    <li>Name: ${highscoreList[1][0]}, Score: ${highscoreList[1][1]}</li>
    <li>Name: ${highscoreList[2][0]}, Score: ${highscoreList[2][1]}</li>
    <li>Name: ${highscoreList[3][0]}, Score: ${highscoreList[3][1]}</li>
    <li>Name: ${highscoreList[4][0]}, Score: ${highscoreList[4][1]}</li>
 `;
  }

  endGame() {
    const endScreen = document.getElementById("end-window");
    endScreen.style.display = "flex";
    const highScoreText = document.getElementById("highscores");
    const endScreenText = document.getElementById("stats");
    const stats = this.displayStats();
    const highScores = this.displayHighscores();
    endScreenText.innerHTML = stats;
    highScoreText.innerHTML = highScores;
  }
}