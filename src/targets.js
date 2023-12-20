class Target {
  constructor(
    spawnPositionX,
    spawnPositionY,
    scaleFactor,
    speed,
    targetNumber
  ) {
    this.spawnPositionX = spawnPositionX;
    this.spawnPositionY = spawnPositionY;
    this.scaleFactor = scaleFactor;
    this.speed = speed;
    this.fallingSpeed = 3;
    this.positionX = spawnPositionX; // initial pos at spawn pos
    this.positionY = spawnPositionY; // initial pos at spawn pos
    this.targetNumber = targetNumber;
    this.balloonIsHit = false;
    this.broccoliIsHit = false;
    this.broccoliWasHit = false;
    this.targetRising = true;
    this.growing = false;
    // get game screen for appending targets
    this.gameScreen = document.getElementById("game-screen");
  }

  makeTarget() {
    console.log("targets.js makeTarget");
    console.log(`${this.positionX}`, `${this.positionY}`);

    // make a target container element
    const targetContainer = document.createElement("div");
    targetContainer.className = "target-container";
    targetContainer.id = `target-${this.targetNumber}`;
    // target counter needed for exact id for positioning?
    // position target initially
    targetContainer.style.position = "absolute";
    targetContainer.style.left = `${this.positionX}px`;
    targetContainer.style.bottom = `${this.positionY}px`;
    // style the target
    const targetWidth = 4 * this.scaleFactor;
    const targetHeight = 9 * this.scaleFactor;
    targetContainer.style.width = `${targetWidth}px`;
    targetContainer.style.height = `${targetHeight}px`;
    targetContainer.style.backgroundColor = "none";
    targetContainer.style.display = "none";
    // append target
    this.gameScreen.appendChild(targetContainer);

    // make a balloon element
    const balloon = document.createElement("div");
    balloon.className = "balloon-class";
    balloon.id = `balloon-${this.targetNumber}`;
    balloon.style.position = "absolute";
    balloon.style.left = "0";
    balloon.style.top = "0";
    balloon.style.width = "100%";
    balloon.style.height = `${(5 / 9) * 100}%`;
    balloon.style.backgroundColor = "none";
    // append balloon
    targetContainer.appendChild(balloon);

    // make a broccoli element
    const broccoli = document.createElement("div");
    broccoli.className = "broccoli-class";
    broccoli.id = `broccoli-${this.targetNumber}`;
    broccoli.style.position = "absolute";
    broccoli.style.left = "0";
    broccoli.style.top = `${(5 / 9) * 100}%`;
    broccoli.style.width = "100%";
    broccoli.style.height = `${(4 / 9) * 100}%`;
    broccoli.style.backgroundColor = "none";
    // append balloon
    targetContainer.appendChild(broccoli);

    // add event listeners
    // pass specific id of elements
    balloon.addEventListener("mousedown", () => {
      this.ballooniHit(targetContainer.id, balloon.id, broccoli.id);
    });
    broccoli.addEventListener("mousedown", () => {
      this.broccoliHit(broccoli.id);
    });
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

  // check if target is out of screen
  isGone() {
    if (this.positionY > window.innerHeight) {
      return true;
    } else {
      //console.log (window. innerHeight);
      return false;
    }
  }

  ballooniHit(targetId, balloonId, broccoliId) {
    // change state
    this.balloonIsHit = true;
    this.targetRising = false;
    // add explosion sprite
    const balloon = document.getElementById(`${balloonId}`);
    const target = document.getElementById(`${targetId}`);
    const broccoli = document.getElementById(`${broccoliId}`);
    balloon.classList.add("belloon-explode");
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

  broccoliHit(id) {
    // change state
    this.broccoliIsHit = true;
    this.broccoliWasHit = true;
    // add dart sprite
    const broccoli = document.getElementById(`${id}`);
    broccoli.classList.add("broccoli-hit");
    // setTimeout(() => {
    //   broccoli.classList.remove("broccoli-hit");
    // }, 500);
  }

  growInGround(targetNum) {
    // if (this.growing === false) {
    //   for (let i = 0; i < Math.random() * 50; i++) {
    //     this.moveTarget();
    //   }
    // }
    const broccoli = document.getElementById(`broccoli-${targetNum}`);
    // change growing image (if prev hit, grow rotten)
    if (!this.broccoliWasHit) {
      broccoli.classList.add("broccoli-growing");
    } else {
      broccoli.classList.add("broccoli-growing-hit");
    }
    // this.growing = true;
  }
}
