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
    this.positionX = spawnPositionX; // initial pos at spawn pos
    this.positionY = spawnPositionY; // initial pos at spawn pos
    this.targetNumber = targetNumber;
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
    broccoli.style.position = "absolute";
    broccoli.style.left = "0";
    broccoli.style.top = `${(5 / 9) * 100}%`;
    broccoli.style.width = "100%";
    broccoli.style.height = `${(4 / 9) * 100}%`;
    broccoli.style.backgroundColor = "none";
    // append balloon
    targetContainer.appendChild(broccoli);
  }

  moveTarget() {
    this.positionY+=this.speed;
  }

  displayTarget() {
    const target = document.getElementById(`target-${this.targetNumber}`);
    target.style.display = "block";
    target.style.bottom = `${this.positionY}px`;
  }

  // check if target is out of screen
  isGone() {
    if (this.positionY > window. innerHeight){
        return true;
    } else {
        //console.log (window. innerHeight);
        return false;
    }
  }
}
