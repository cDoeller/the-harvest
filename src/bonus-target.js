class BonusTarget extends Target {
  constructor(
    spawnPositionX,
    spawnPositionY,
    scaleFactor,
    score,
    speed,
    targetNumber
  ) {

    super(    
    spawnPositionX,
    spawnPositionY,
    scaleFactor,
    score,
    speed,
    targetNumber);

    // count how often it has been hit
    this.hitCount = 0;
    this.necessaryHits = 3;
  }

  // CHANGED
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
    balloon.className = "bonus-balloon-class";
    this.balloonID = `bonus-balloon-${this.targetNumber}`;
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
    broccoli.className = "bonus-broccoli-class";
    this.broccoliID = `bonus-broccoli-${this.targetNumber}`;
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

  // CHANGED
  ballooniHit() {
    // do not react if we have to reload
    if (this.mustReload) return;
    // count how often it has been hit
    if (this.hitCount < this.necessaryHits) {
      this.hitCount++;
      const metalBalloonSound = new Audio("./sound/metal-balloon.mp3"); // balloon
      metalBalloonSound.play();
      console.log("metal balloon hit");
      return;
    }
    // sound
    const balloonSound = new Audio("./sound/metal-balloon-explode.mp3"); // balloon
    balloonSound.play();
    console.log("metal balloon destroyed");
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
      broccoli.classList.add("bonus-broccoli-falling");
    } else {
      broccoli.classList.add("bonus-broccoli-rotten-falling");
    }
    setTimeout(() => {
      balloon.remove();
      // let klicks through div element
      target.style.pointerEvents = "none";
    }, 50);
  }

  // CHANGED
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
    broccoli.classList.add("bonus-broccoli-hit");
  }

  // CHANGE
  growInGround() {
    const broccoli = document.getElementById(`${this.broccoliID}`);
    // sound
    const growingSound = new Audio("./sound/growing.mp3"); // growing
    growingSound.play();
    // change growing image (if prev hit, grow rotten)
    if (!this.broccoliWasHit) {
      broccoli.classList.add("bonus-broccoli-growing");
    } else {
      broccoli.classList.add("bonus-broccoli-growing-hit");
    }
    this.growing = true;
  }

}
