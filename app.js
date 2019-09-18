let totalScores;
let roundScore;
let activePlayer;
let previousRoll;
let targetScore;

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("current-" + activePlayer).innerHTML =
    "<em>" + roundScore + "</em>";

  if (roll === 6 && previousRoll === 6) {
    totalScores[activePlayer] = 0;
    document.getElementById("current-" + activePlayer).innerHTML = "0";
    document.getElementById("score-" + activePlayer).textContent = "0";

    togglePlayer();
    return;
  }
  previousRoll = roll;

  const diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + roll + ".png";

  if (roll > 1) {
    // add the score to current
    roundScore += roll;
    document.getElementById("current-" + activePlayer).innerHTML =
      "<em>" + roundScore + "</em>";
  } else {
    //next player
    document.getElementById("current-" + activePlayer).innerHTML = "0";
    roundScore = 0;
    togglePlayer();
  }
}

function togglePlayer() {
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.toggle("active");

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.toggle("active");

  //adding so that the previous roll is not compared against the last player
  previousRoll = 0;
}

function showExtraElements(shown) {
  const currentScoreBoxes = document.getElementsByClassName(
    "player-current-box"
  );
  if (shown) {
    document.querySelector(".btn-roll").style.display = "block";
    document.querySelector(".btn-hold").style.display = "block";
    for (let i = 0; i <= 1; i++) {
      currentScoreBoxes.item(i).style.display = "block";
    }
  } else {
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
    for (let i = 0; i <= 1; i++) {
      currentScoreBoxes.item(i).style.display = "none";
    }
  }
}

//game setup
function newGame() {
  document.getElementById("span-score").classList.add("show");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.getElementById("name-0").innerText = "Player 1";
  document.getElementById("name-1").innerText = "Player 2";
  showExtraElements(true);
  previousRoll = 0;
  totalScores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
}

function holdScore() {
  totalScores[activePlayer] += roundScore;
  document.getElementById("score-" + activePlayer).textContent =
    totalScores[activePlayer];
  document.getElementById("current-" + activePlayer).textContent = "0";
  roundScore = 0;

  if (totalScores[activePlayer] >= targetScore) {
    document.getElementById("name-" + activePlayer).innerText = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");

    //let's also take away everything but the new game button.
    showExtraElements(false);
    return;
  }

  togglePlayer();
  document.querySelector(".dice").style.display = "none";
}

function setScore() {
  const winTarget = document.getElementById("input-winning-score").value;
  if (isNaN(winTarget) && winTarget.length > 0) {
    alert(winTarget + " is not a valid number!");
    document.getElementById("input-winning-score").value = "";
    return;
  } else if (winTarget.length === 0) {
    targetScore = 100; //default value
  } else {
    targetScore = winTarget;
  }
  document.getElementById("span-score").classList.remove("show");
}

function keyboardListener(e) {
  if (e.key === "Enter") {
    setScore();
  }
}

//Assigning Handlers
document.querySelector(".btn-roll").addEventListener("click", rollDie);
document.querySelector(".btn-new").addEventListener("click", newGame);
document.querySelector(".btn-hold").addEventListener("click", holdScore);
document.querySelector(".btn-start").addEventListener("click", setScore);
document
  .getElementById("input-winning-score")
  .addEventListener("keydown", keyboardListener);

//setup for first time play
newGame();
