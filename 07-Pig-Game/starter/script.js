'use strict';
//diagrams.net - build flowcharts for what the application has to do covering all scenarios

//Selecting elements so that they can be reused with variables

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const current0El = document.getElementById('current--0');

//Bit faster than queryselector
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
//dice element
const diceEl = document.querySelector('.dice');
//select all the buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//declare it in global scope and reassign it later
let playing, activePlayer, currentScore, scores;

const init = function () {
  //starting scores/resetting scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  //resetting current scores
  current0El.textContent = 0;
  current1El.textContent = 0;
  //Total scores
  scores = [0, 0];
  //To persist current value define it in global scope
  currentScore = 0;
  activePlayer = 0;
  //state variable to track progress of the game
  playing = true;

  // remove the winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //hide the dice and assign active class - if class already present it wont be added twice
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //Hiding the dice initially
  diceEl.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //drop the current score
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //At a time only one player will have this active class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //playing itself is a boolean variable
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1:
    if (dice !== 1) {
      //add the dice value to current score
      currentScore += dice;
      //Dynamically select the element based on the current player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player's score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores[activePlayer]);
    //Check if player's score is >= 100, if yes finish the game, declaring the winner
    if (scores[activePlayer] >= 50) {
      //To end the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //Hide the dice on end
      diceEl.classList.add('hidden');
    } else {
      // Else switch to the next player
      switchPlayer();
    }
  }
});
//Can directly pass the init function as a value instead of calling it
btnNew.addEventListener('click', init);
