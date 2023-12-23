class Target {
  constructor(
    spawnPositionX,
    spawnPositionY,
    scaleFactor,
    score,
    speed,
    targetNumber
  ) {
    // assign variables to object
    this.spawnPositionX = spawnPositionX;
    this.spawnPositionY = spawnPositionY;
    this.scaleFactor = scaleFactor;
    this.score = score;
    this.speed = speed;
    this.targetNumber = targetNumber;

    // initial position when spawning
    this.positionX = spawnPositionX;
    this.positionY = spawnPositionY;

    // save the entire ID
    this.targetID = "";
    this.broccoliID = "";
    this.balloonID = "";

    // speed for falling down
    this.fallingSpeed = 10;

    this.balloonIsHit = false;
    this.broccoliIsHit = false;
    this.broccoliWasHit = false;
    this.targetRising = true;
    this.growing = false;

    // get game screen for appending targets
    this.gameScreen = document.getElementById("game-screen");

    // activate or deactivate target reactions to clicks depending on reload
    this.mustReload = false;
  }

  makeTarget() {
    // make a target container element
    const targetContainer = document.createElement("div");
    targetContainer.className = "target-container";
    this.targetID = `target-${this.targetNumber}`;
    targetContainer.id = this.targetID;
    // position target initially
    targetContainer.style.position = "absolute";
    targetContainer.style.left = `${this.positionX}px`;
    targetContainer.style.bottom = `${this.positionY}px`;
    // style the target
    const targetWidth = 4 * this.scaleFactor;
    const targetHeight = 9 * this.scaleFactor;
    targetContainer.style.width = `${targetWidth}px`;
    targetContainer.style.height = `${targetHeight}px`;
    //targetContainer.style.display = "none";
    // append target
    this.gameScreen.appendChild(targetContainer);

    // make a balloon element
    const balloon = document.createElement("div");
    balloon.className = "balloon-class";
    this.balloonID = `balloon-${this.targetNumber}`;
    balloon.id = this.balloonID;
    // style balloon element
    balloon.style.position = "absolute";
    balloon.style.left = "0";
    balloon.style.top = "0";
    balloon.style.width = "100%";
    balloon.style.height = `${(5 / 9) * 100}%`;
    // append balloon
    targetContainer.appendChild(balloon);

    // make a broccoli element
    const broccoli = document.createElement("div");
    broccoli.className = "broccoli-class";
    this.broccoliID = `broccoli-${this.targetNumber}`;
    broccoli.id = this.broccoliID;
    // style broccoli
    broccoli.style.position = "absolute";
    broccoli.style.left = "0";
    broccoli.style.top = `${(5 / 9) * 100}%`;
    broccoli.style.width = "100%";
    broccoli.style.height = `${(4 / 9) * 100}%`;
    // add event listeners
    balloon.addEventListener("mousedown", () => {
      this.ballooniHit();
    });
    broccoli.addEventListener("mousedown", () => {
      this.broccoliHit();
    });
    // append balloon
    targetContainer.appendChild(broccoli);
  }

  moveTarget() {
    if (this.targetRising) {
      this.positionY += this.speed;
    } else {
      this.positionY -= this.fallingSpeed;
    }
  }

  displayTarget() {
    const target = document.getElementById(`target-${this.targetNumber}`);
    target.style.display = "block";
    target.style.bottom = `${this.positionY}px`;
  }

  isGone() {
    if (this.positionY > window.innerHeight) {
      return true;
    } else {
      //console.log (window. innerHeight);
      return false;
    }
  }

  ballooniHit() {
    // do not react if we have to reload
    if (this.mustReload) return;
    // sound
    const balloonSound = new Audio("./sound/balloon.mp3"); // balloon
    balloonSound.play();
    console.log("balloon hit");
    // change state
    this.balloonIsHit = true;
    this.targetRising = false;
    // add explosion sprite
    const balloon = document.getElementById(this.balloonID);
    const target = document.getElementById(`${this.targetID}`);
    const broccoli = document.getElementById(`${this.broccoliID}`);
    // put smallest in front
    if (this.scaleFactor == 5) broccoli.style.zIndex = "3";
    if (this.scaleFactor == 10) broccoli.style.zIndex = "2";
    if (this.scaleFactor == 15) broccoli.style.zIndex = "1";
    // make balloon explode
    balloon.classList.add("belloon-explode");
    // broccoli stays rotten, generally changing to falling
    if (!this.broccoliWasHit) {
      broccoli.classList.add("broccoli-falling");
    } else {
      broccoli.classList.add("broccoli-rotten-falling");
    }
    setTimeout(() => {
      balloon.remove();
      // let klicks through div element
      target.style.pointerEvents = "none";
    }, 50);
  }

  broccoliHit() {
    // do not react if we have to reload
    if (this.mustReload) return;
    // sound
    const broccoliSound = new Audio("./sound/broccoli.mp3"); // broccoli
    broccoliSound.play();
    // change state
    this.broccoliIsHit = true;
    this.broccoliWasHit = true;
    // add dart sprite
    const broccoli = document.getElementById(`${this.broccoliID}`);
    broccoli.classList.add("broccoli-hit");
  }

  growInGround() {
    const broccoli = document.getElementById(`${this.broccoliID}`);
    // sound
    const growingSound = new Audio("./sound/growing.mp3"); // growing
    growingSound.play();
    // change growing image (if prev hit, grow rotten)
    if (!this.broccoliWasHit) {
      broccoli.classList.add("broccoli-growing");
    } else {
      broccoli.classList.add("broccoli-growing-hit");
    }
    this.growing = true;
  }
}
