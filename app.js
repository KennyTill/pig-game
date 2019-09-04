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
let dice;

let rollbtn;

totalScores = [0, 0];
roundScore = 0;
activePlayer = 0;

dice = 6;

function rollAndUpdateDie() {}

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;

  document
    .getElementsByClassName("dice")
    .item(0)
    .setAttribute("src", "dice-" + roll + ".jpg");
}

document.onload(function() {
  rollbtn = document.getElementsByClassName("btn-roll").item(0);
  rollbtn.onclick = rollDie;
});
