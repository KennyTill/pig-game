/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let totalScores;
let roundScore;
let activePlayer;

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("current-" + activePlayer).innerHTML =
    "<em>" + roundScore + "</em>";

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
  document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");
}

//game setup
function newGame() {
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  totalScores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  console.log("new game called");
}

function holdScore() {
  totalScores[activePlayer] += roundScore;
  document.getElementById("score-" + activePlayer).textContent = totalScores[activePlayer];
  document.getElementById("current-" + activePlayer).textContent = "0";
  roundScore = 0;
  togglePlayer();
  document.querySelector(".dice").style.display = "none";
}

//Assigning Buttons
document.querySelector(".btn-roll").addEventListener("click", rollDie);
document.querySelector(".btn-new").addEventListener("click", newGame);
document.querySelector(".btn-hold").addEventListener("click", holdScore);

//setup for first time play
newGame();
