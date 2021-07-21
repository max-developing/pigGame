"use strict";

const inputScore = document.querySelector(".inputScore");
let SCORE_TO_WIN;

const playerPanel1 = document.querySelector(".player__0");
const playerPanel2 = document.querySelector(".player__1");

const playerName1 = document.querySelector(".player__name--0");
const playerName2 = document.querySelector(".player__name--1");

const score1 = document.querySelector(".score__p0");
const score2 = document.querySelector(".score__p1");

const curScore1 = document.querySelector(".current__score__p0");
const curScore2 = document.querySelector(".current__score__p1");

const dice = document.querySelector(".dice");
const dice2 = document.querySelector(".dice2");
const btnNew = document.querySelector(".btn__newGame");
const btnRoll = document.querySelector(".btn__roll");
const btnHold = document.querySelector(".btn__hold");

let score, activePlayer, currentScore, gamePlaying;

const init = function () {
  score1.textContent = 0;
  score2.textContent = 0;
  curScore1.textContent = 0;
  curScore2.textContent = 0;
  playerName1.textContent = "Player 1";
  playerName2.textContent = "Player 2";

  playerPanel1.classList.remove("player--active");
  playerPanel2.classList.remove("player--active");
  playerPanel1.classList.remove("player--winner");
  playerPanel2.classList.remove("player--winner");
  playerPanel1.classList.add("player--active");

  inputScore.value = "";

  dice.style.display = "none";
  dice2.style.display = "none";

  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gamePlaying = true;
};

init();

const nextPlayer = function () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  dice.style.display = "none";
  dice2.style.display = "none";
  playerPanel1.classList.toggle("player--active");
  playerPanel2.classList.toggle("player--active");
  curScore1.textContent = 0;
  curScore2.textContent = 0;
  currentScore = 0;
};

btnRoll.addEventListener("click", function () {
  if (gamePlaying) {
    // Get random number from 1 to 6
    const diceRoll = Math.trunc(Math.random() * 6 + 1);
    const diceRoll2 = Math.trunc(Math.random() * 6 + 1);
    // Change dice acording to random number
    dice.src = `diceImg/dice-${diceRoll}.png`;
    dice2.src = `diceImg/dice-${diceRoll2}.png`;
    // Dispaly dice
    dice.style.display = "block";
    dice2.style.display = "block";
    // Update current score if dice !== 0
    if (diceRoll !== 1 && diceRoll2 !== 1) {
      currentScore += diceRoll + diceRoll2;
      document.querySelector(`.current__score__p${activePlayer}`).textContent =
        currentScore;
    } else {
      nextPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (gamePlaying) {
    inputScore.value === ""
      ? (SCORE_TO_WIN = 100)
      : (SCORE_TO_WIN = +inputScore.value);
    // Guard clause for accidentally clicking on hold right away
    if (currentScore === 0) return;
    // Update variable and UI
    score[activePlayer] += currentScore;
    document.querySelector(`.score__p${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= SCORE_TO_WIN) {
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.add("player--winner");

      document.querySelector(`.player__name--${activePlayer}`).textContent =
        "WINNER !";

      dice.style.display = "none";
      dice2.style.display = "none";

      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  if (gamePlaying) return;
  if (!gamePlaying) init();
});
