'use strict';

//Query selector returns element and then we retrieve its content by accessing textContent Property
//dot operator are executed from left to right
//Read the content
console.log(document.querySelector('.message').textContent);

//DOM is the complete representation of html document that is created by the browser on html load. document is the entry point to access and edit the html attributes and css styles
//DOM tree has nodes for each html element, text and comments

//DOM methods and properties are part of browser Web APIs which can be accessed from the javascript to manipualte the web page that are displayed and rendered in the browser

//To manipulate the text content of a DOM node

/* document.querySelector('.message').textContent = '🎉 Correct Number !';
document.querySelector('.score').textContent = '10';
document.querySelector('.number').textContent = '12';*/

//For input field in order to get the actual value we need to use value property
//Write to input field and then read it

/*document.querySelector('.guess').value = 11;
console.log(document.querySelector('.guess').value);*/

//secret number should only be defined once
//trunc remove the trailing decimals and random generates a number between 0 and 1
const calcRandom = () => Math.trunc(Math.random() * 20) + 1;
let secretNumber = calcRandom();

//Store the value in code so application is aware of this variable at all points
//state variable that holds data relavent to the application
let score = 20;
let highscore = 0;

const displayContent = function (className, content) {
  // console.log(`${className}`, content);
  document.querySelector(`.${className}`).textContent = content;
};

//Listen for events like mouse click, mouse hover, key press - with an event listener - and react to those events

//First select the element where the event must happen
//The addEventListener method attaches an Event Handler to the event that occurs on that element - function is a value so we can pass it as parameter to the addEventListener method

document.querySelector('.check').addEventListener('click', function () {
  //What ever we get from input field is a string - so convert to Number
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  //If input number is not entered then guess becomes 0 and it is a falsy value
  //When there is no input
  if (!guess) {
    displayContent('message', '❌ Enter a valid number');
  } else if (guess === secretNumber) {
    //When the player wins the game
    displayContent('message', '🎉 Correct Number 🎉');
    displayContent('number', secretNumber);
    document.querySelector('body').style.backgroundColor = '#60b347';
    //The assigned value should be of type string - style is applied as inline styles within the body - doesnt change the css file
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      displayContent('highscore', highscore);
    }
  } else if (guess !== secretNumber) {
    //When guess is wrong
    if (score > 1) {
      displayContent(
        'message',
        guess > secretNumber
          ? '📈 Guess is too high !'
          : '📉 Guess is too low !'
      );

      score--;
      displayContent('score', score);
    } else {
      console.log('In else block < lesser guess');
      displayContent('message', ' 💥 You lose 💥');
      score = 0;
      displayContent('score', score);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = calcRandom();
  displayContent('message', 'Start guessing...');
  displayContent('number', '?');
  displayContent('score', score);
  //Empty string represents the absence of value in the input field - value property is used for assigning to input fields
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
});
