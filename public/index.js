let playerOne = {
  id: 1,
  score: 0,
  tracker: [],
  winCard: {
    whichPlayer: "PLAYER 1",
    whichColor: "#fd6687",
  },
  timeCard: {
    whosTurn: "PLAYER 1'S TURN",
    imageSrc: "./assets/images/turn-background-red.svg",
    textColor: "#fff",
  },
};
let playerTwo = {
  id: 2,
  score: 0,
  tracker: [],
  winCard: {
    whichPlayer: "PLAYER 2",
    whichColor: "#ffce67",
  },
  timeCard: {
    whosTurn: "PLAYER 2'S TURN",
    imageSrc: "./assets/images/turn-background-yellow.svg",
    textColor: "#000",
  },
};
let isPlayerOnesTurn = true;
let isPlayerTwosTurn = false;
let startingTime = 30;
let intervalId;
const allSlots = {
  0: [35, 28, 21, 14, 7, 0],
  1: [36, 29, 22, 15, 8, 1],
  2: [37, 30, 23, 16, 9, 2],
  3: [38, 31, 24, 17, 10, 3],
  4: [39, 32, 25, 18, 11, 4],
  5: [40, 33, 26, 19, 12, 5],
  6: [41, 34, 27, 20, 13, 6],
};
let emptySlots = structuredClone(allSlots);
const isSlotEmpty = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  13: true,
  14: true,
  15: true,
  16: true,
  17: true,
  18: true,
  19: true,
  20: true,
  21: true,
  22: true,
  23: true,
  24: true,
  25: true,
  26: true,
  27: true,
  28: true,
  29: true,
  30: true,
  31: true,
  32: true,
  33: true,
  34: true,
  35: true,
  36: true,
  37: true,
  38: true,
  39: true,
  40: true,
  41: true,
};
const winningCombinations = [
  // row 0 (horizontal)
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],

  // row 1 (horizontal)
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],

  // row 2 (horizontal)
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],

  // row 3 (horizontal)
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],

  //row 4 (horizontal)
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],

  // row 5 (horizontal)
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],

  // column 0 (vertical)
  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],

  // column 1 (vertical)
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [15, 22, 29, 36],

  // column 2 (vertical)
  [2, 9, 16, 23],
  [9, 16, 23, 30],
  [16, 23, 30, 37],

  // column 3 (vertical)
  [3, 10, 17, 24],
  [10, 17, 24, 31],
  [17, 24, 31, 38],

  // column 4 (vertical)
  [4, 11, 18, 25],
  [11, 18, 25, 32],
  [18, 25, 32, 39],

  // column 5 (vertical)
  [5, 12, 19, 26],
  [12, 19, 26, 33],
  [19, 26, 33, 40],

  // column 6 (vertical)
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],

  // column 0 (upward diagonal)
  [21, 15, 9, 3],
  [28, 22, 16, 10],
  [35, 29, 23, 17],

  // column 1 (upward diagonal)
  [22, 16, 10, 4],
  [29, 23, 17, 11],
  [36, 30, 24, 18],

  // column 2 (upward diagonal)
  [23, 17, 11, 5],
  [30, 24, 18, 12],
  [37, 31, 25, 19],
  // column 3 (upward diagonal)
  [24, 18, 12, 6],
  [31, 25, 19, 13],
  [38, 32, 26, 20],

  // column 0 (downward diagonal)
  [0, 8, 16, 24],
  [7, 15, 23, 31],
  [14, 22, 30, 38],

  // column 1 (downward diagonal)
  [1, 9, 17, 25],
  [8, 16, 24, 31],
  [15, 23, 31, 39],

  // column 2 (downward diagonal)
  [2, 10, 18, 26],
  [9, 17, 25, 33],
  [16, 24, 32, 40],

  // column 3 (downward diagonal)
  [3, 11, 19, 27],
  [10, 18, 26, 34],
  [17, 25, 33, 41],
];

//////////////////////////////////////////////

// Startup Screen

//////////////////////////////////////////////
$("section").hide();
$("#main").show();

//////////////////////////////////////////////

// Timer

//////////////////////////////////////////////
function startCountdown() {
  if (!document.getElementById("timer-card").style.display === "none") {
    intervalId = setInterval(countdown, 1000);
    return intervalId
  }
}

function stopCountdown() {
  clearInterval(intervalId);
  intervalId = "something";
}

function countdown() {
  if (startingTime != 0) {
    startingTime -= 1;
    console.log(startingTime);
  } else {
    stopCountdown();

    if (isPlayerOnesTurn) {
      announceTheWinner(playerTwo);
    } else {
      announceTheWinner(playerOne);
    }
  }

  $("#seconds").html(`${startingTime}s`);
}

function resetSeconds() {
  stopCountdown();
  startingTime = 30;
  $("#seconds").html(`${startingTime}s`);
}

//////////////////////////////////////////////

// Styling

//////////////////////////////////////////////

// Rules
function addHoverEffect() {
  let checkmark = document.getElementById("checkmark");
  // console.log(checkmark)
  checkmark.addEventListener("mouseenter", () => {
    checkmark.src = "./assets/images/icon-check-hover.svg";
  });
  checkmark.addEventListener("mouseleave", () => {
    checkmark.src = "./assets/images/icon-check.svg";
  });
}
addHoverEffect();

// Game
function displayTimeCard(object) {
  document.querySelector(".announcer-text").innerHTML = object.whosTurn;
  document
    .getElementById("timer-card")
    .children[1].setAttribute("src", object.imageSrc);
  document.querySelector(".announcer-text").style.color = object.textColor;
}

function displayWinCard(object) {
  document.getElementById("winning-player").innerHTML = object.whichPlayer;
  document.getElementById("colored-bar").style.backgroundColor =
    object.whichColor;
  document.getElementById("timer-card").style.display = "none";
  document.getElementById("winner-card").style.display = "block";
}

function hideWinCard() {
  document.getElementById("timer-card").style.display = "block";
  document.getElementById("winner-card").style.display = "none";
}

function displayWhiteCircles(combination) {
  combination.forEach((number) => {
    const whiteCounter = document.createElement("img");
    whiteCounter.src = "./assets/images/white-circle.svg";
    whiteCounter.classList.add("white-counter");
    document.getElementById(`board-cell-${number}`).style.position = "absolute";
    document.getElementById(`board-cell-${number}`).parentNode.appendChild(whiteCounter);
  });
}

function removeWhiteCirlces() {
  document
    .querySelectorAll(".white-counter")
    .forEach((counter) => counter.remove());
}

function resetSpacerColor() {
  document.getElementById("colored-bar").style.backgroundColor = "#5c2dd5";
}

//////////////////////////////////////////////

// Turn Logic

//////////////////////////////////////////////
function passTheTurn() {
  if (isPlayerOnesTurn) {
    isPlayerOnesTurn = false;
    isPlayerTwosTurn = true;
    displayTimeCard(playerTwo.timeCard);
    // console.log("It is now Player Two's turn");
  } else {
    isPlayerOnesTurn = true;
    isPlayerTwosTurn = false;
    displayTimeCard(playerOne.timeCard);
    // console.log("It is now Player One's turn");
  }
  toggleHoveringArrowColor();
  resetSeconds();
  startCountdown();
}

function checkWinConditions() {
  winningCombinations.forEach((combination) => {
    if (combination.every((number) => playerOne.tracker.includes(number))) {
      // console.log(`The winning combination is ${combination}`);
      announceTheWinner(playerOne);
    } else if (
      combination.every((number) => playerTwo.tracker.includes(number))
    ) {
      // console.log(`The winning combination is ${combination}`);
      announceTheWinner(playerTwo);
    } else {
      return;
    }
    return displayWhiteCircles(combination);
  });
}

function resetScore() {
  playerOne.score = 0;
  playerTwo.score = 0;
  document.getElementById("player-1").innerHTML = playerOne.score;
  if (document.querySelector(".on-right").style.display == "none") {
    document.querySelector(".on-left").innerHTML = playerTwo.score;
  } else {
    document.querySelector(".on-right").innerHTML = playerTwo.score;
  }
}

function incrementScore(player) {
  player.score += 1;
  $(`#player-${player.id}`).html(player.score);
  $(`#mini-player-${player.id}`).html(player.score);
}

function announceTheWinner(player) {
  incrementScore(player);
  displayWinCard(player.winCard);
  turnBoardOff();
  resetSeconds();
}

function resetTrackers() {
  playerOne.tracker = [];
  playerTwo.tracker = [];
}

function resetStlyes() {
  hideWinCard();
  resetSeconds();
  resetSpacerColor();
  hideDisks();
  removeWhiteCirlces();
  document.getElementById("seconds").innerHTML = "PLAY";
}

function resetGameLogic() {
  resetTrackers();
  emptyUsedSlots();
  resetDiskSlots();
  turnBoardOn();
}

function playAgain() {
  resetStlyes();
  resetGameLogic();
}

function restartGame() {
  showGame();
  playAgain();
}

function newGame() {
  restartGame();
  resetScore();
}

function quitGame() {
  location.reload();
}

//////////////////////////////////////////////

// Hovering Arrows

//////////////////////////////////////////////
function createHoveringArrows() {
  for (let i = 0; i < 7; i++) {
    grid = document.querySelector(".arrows");
    cell = document.createElement("div");
    cell.classList.add("arrow");
    cell.style.display = "none";
    cell.id = `cell-${i}`;

    redArrow = document.createElement("img");
    redArrow.src = "./assets/images/marker-red-vertical-box-shadow.svg";
    redArrow.classList.add("hovering-arrow");
    cell.appendChild(redArrow);
    grid.appendChild(cell);
  }
}
createHoveringArrows();

function toggleHoveringArrowColor() {
  allArrowCells = document.querySelectorAll(".arrow");
  // console.log(allArrowCells);

  if (isPlayerOnesTurn) {
    allArrowCells.forEach((arrowCell) => {
      arrowCell.firstChild.src =
        "./assets/images/marker-red-vertical-box-shadow.svg";
    });
  } else {
    allArrowCells.forEach((arrowCell) => {
      arrowCell.firstChild.src = "./assets/images/marker-yellow.svg";
    });
  }
}

//////////////////////////////////////////////

// Disk logic

//////////////////////////////////////////////

function createDisks() {
  const grid = document.querySelector(".grid-cell-slots");
  for (let i = 0; i < 42; i++) {
    let div = document.createElement("div");
    div.style.position = "relative";
    let img = document.createElement("img");
    img.src = "./assets/images/counter-red-large.svg";
    img.style.visibility = "hidden";
    img.id = `board-cell-${i}`;
    div.appendChild(img);
    grid.appendChild(div);
  }
}
createDisks();

const dropDisk = (e) => {
  const fileId = e.currentTarget.id;
  const lowestSlot = Math.max(...emptySlots[fileId]);

  // console.log(
  //   `\nDisk dropped in file ${fileId}.\n
  //   Empty slots in file ${fileId}: [${emptySlots[fileId].join(", ")}].\n
  //   The lowest slot in file ${fileId} is slot ${lowestSlot}.
  //   Slot ${lowestSlot} is empty: ${isSlotEmpty[lowestSlot]}
  //   `
  // );

  if (isSlotEmpty[lowestSlot]) {
    isSlotEmpty[lowestSlot] = false;
    // console.log("  Filling slot...");

    function loadVisibleDisk(slot) {
      const disk = document.getElementById(`board-cell-${slot}`);
      // console.log(disk);
      disk.style.visibility = "visible";
      if (isPlayerTwosTurn) {
        disk.src = "./assets/images/counter-yellow-large.svg";
      } else if (isPlayerOnesTurn) {
        disk.src = "./assets/images/counter-red-large.svg";
      }
    }
    loadVisibleDisk(lowestSlot);

    if (emptySlots[fileId].length != 0) {
      emptySlots[fileId].shift(1);
      // console.log(`The remaining empty slots in the file are ${emptySlots[fileId]}\n`);
    }
    // console.log(`  Slot ${lowestSlot} is empty: ${isSlotEmpty[lowestSlot]}`);
  }
  // console.log(`  Empty slots in file ${fileId}: [${emptySlots[fileId].join(",")}].`);

  updatePlayersSlotTrackers(lowestSlot);
  checkWinConditions();
};

function updatePlayersSlotTrackers(slot) {
  if (isPlayerOnesTurn) {
    playerOne.tracker.push(slot);
  } else {
    playerTwo.tracker.push(slot);
  }
  // console.log(`Currently, playerOne's tracker is ${playerOne.tracker.join(", ")}.`);
  // console.log(`Currently, playerTwo's tracker is ${playerTwo.tracker.join(", ")}.`);
}

function hideDisks() {
  let slots = document.querySelector(".grid-cell-slots").children
  for (let i = 0; i < slots.length; i++) {
    slots[i].firstChild.style.visibility = "hidden";
  }
}

function emptyUsedSlots() {
  for (slot in isSlotEmpty) {
    isSlotEmpty[slot] = true;
  }
}
function resetDiskSlots() {
  emptySlots = structuredClone(allSlots);
}

//////////////////////////////////////////////

// Event Listeners

//////////////////////////////////////////////
function revealHoveringArrows() {
  const arrowCell = document.querySelectorAll(".arrow");
  const gameBoardFile = document.querySelectorAll(".file");
  gameBoardFile.forEach((file, index) => {
    file.addEventListener("mouseenter", () => {
      arrowCell[index].style.display = "block";
      // arrowCell[index].classList.add("hovered");
    });
    file.addEventListener("mouseleave", () => {
      arrowCell[index].style.display = "none";
      // arrowCell[index].classsList.remove("hovered");
    });
  });
}

const positionColoredBar = () => {
  document.getElementById("colored-bar").style.top =
    document.getElementById("announcer").offsetTop;
  document.getElementById("colored-bar").height =
    window.innerHeight - document.getElementById("announcer").offsetTop;
};
setInterval(positionColoredBar, 1);

function turnBoardOn() {
  for (i = 0; i < 7; i++) {
    document.getElementById(`${i}`).addEventListener("click", dropDisk);
  }

  document.querySelectorAll(".file").forEach((file) => {
    file.addEventListener("click", passTheTurn);
    file.style.cursor = "pointer";
  });

  revealHoveringArrows();
}

function turnBoardOff() {
  for (i = 0; i < 7; i++) {
    document.getElementById(`${i}`).removeEventListener("click", dropDisk);
  }

  document.querySelectorAll(".file").forEach((file) => {
    file.removeEventListener("click", passTheTurn);
    file.style.cursor = "default";
  });
}

//////////////////////////////////////////////

// Button Logic

//////////////////////////////////////////////
const showMain = () => {
  $("section").hide();
  $("#main").show();
};

const showRules = () => {
  $("section").hide();
  $("#rules").show();
  console.log("clicked");
};

const showGame = () => {
  $("section").hide();
  $("#game").show();
};

const showMenu = () => {
  $("#menu").show();
};

//////////////////////////////////////////////

// Button Events

//////////////////////////////////////////////
$("#play-vs-player-button").click(showGame).click(turnBoardOn);
$("#game-rules-button").click(showRules);
$("#checkmark").click(showMain);
$("#menu-button").click(showMenu).click(stopCountdown);
$("#restart-button").click(showGame).click(playAgain);
$("#continue-game-button").click(showGame).click(startCountdown);
$("#new-game-button").click(showGame).click(playAgain).click(resetScore);
$("#quit-game-button").click(quitGame);
$("#play-again-button").click(playAgain);
