'use strict';

console.log('Section 10:Coding Challenge');

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app! */

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  //ES 6 default parameters
  displayResults(type = 'array') {
    // console.log(typeof type);
    const [q1, q2, q3, q4] = this.answers;
    console.log(
      type === 'string'
        ? `Poll results are ${this.answers.join(', ')}`
        : this.answers
    );
  },
  registerNewAnswer() {
    //Get user input
    const numberChosen = Number(
      prompt(
        `${this.question}\n${this.options.join(
          '\n'
        )}\n(Choose an option number from above)`
      )
    );
    // console.log(typeof numberChosen);
    // console.log(numberChosen >= 0 && numberChosen <= 4);
    //use of short circuiting to update the array elements
    typeof numberChosen === 'number' &&
      numberChosen >= 0 &&
      numberChosen < this.answers.length &&
      this.answers[numberChosen]++;

    poll.displayResults('string');
    poll.displayResults('array');
  },
};
// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//Use displayresults to display the following
/* BONUS TEST DATA 1: [5, 2, 3] -> this keyword should point to an object having answers property assigned to this array
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1] */
poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); //calls the method with preset this keyword
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

///////////////////////////////////////
// Coding Challenge #2 - closures - IIFE - Immediately invoked function expression

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})(); //IIFE finishes execution first before the call back fn is called so with the help of closures handler can get access to header variable



