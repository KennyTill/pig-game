/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

-- additional rules --
1: player loses entire score when they roll 2 6's in a row, then swap to next player.

2: Allow players to set winning score so they can change the predefined score.

3. add another dice to the game if both lose current score if either is a 1.

*/

let totalScores;
let roundScore;
let activePlayer;
let previousRoll0;
let previousRoll1;
let targetScore;

function rollDie() {
  const roll0 = Math.floor(Math.random() * 6) + 1;
  const roll1 = Math.floor(Math.random() * 6 ) + 1;


  document.getElementById("current-" + activePlayer).innerHTML =
    "<em>" + roundScore + "</em>";

  if (roll0 === 6 && previousRoll0 === 6) {
    totalScores[activePlayer] = 0;
    document.getElementById("current-" + activePlayer).innerHTML = "0";
    document.getElementById("score-" + activePlayer).textContent = "0";

    togglePlayer();
    return;
  }
  previousRoll0 = roll0;
  previousRoll1 = roll1;

  const dice0 = document.getElementById("dice-0");
  dice0.style.display = "block";
  dice0.src = "dice-" + roll0 + ".png";

  const dice1 = document.getElementById("dice-1");
  dice1.style.display = "block";
  dice1.src = "dice-" + roll1 + ".png";

  if (roll0 > 1 && roll1 > 1) {
    // add the score to current
    roundScore += (roll0 + roll1);
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
  previousRoll0 = 0;
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
  previousRoll0 = 0;
  previousRoll1 = 0;
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
  console.log("target score " + targetScore);
  console.log("input score " + winTarget);
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
