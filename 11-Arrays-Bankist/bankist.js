'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
console.log('Bankist App');

//Lecture 5 - Overview of flow chart

//Lecture 6 - Creating DOM Elements
//Good practice to pass the data into a fn instead of working with a global variable
//Also support sorting feature of movements array with optional parameter sort
const displayMovements = function (movements, sort = false) {
  //Empty the container and start adding new elements
  containerMovements.innerHTML = ''; //textContent returns only the text but html returns text including the html elements

  //create a copy of movements array using slice method and then sort the array so not to mutate the underlying order of the array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // console.log("movs and sort varible",sort, movs);
  movs.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //template literals are amazing to create the html elements - like movement row to log the entry - easy to create multi line string
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${mov}💶</div>
        </div>
    `;
    //Attach the html template to the movements container -using insertAdjacentHTML - which takes two strings - first parameter is the position in which we want to attach the html and second argument is the string
    containerMovements.insertAdjacentHTML('afterbegin', html); //after begin inserts adjacent html after the beginning of movements div tag - new child elements appear before all the other child elements present
  });
};
//displayMovements(account1.movements);

//state variable to monitor whether we are currently sorting the array or not
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  //flip the variable
  sorted = !sorted;
});

//Lecture 7 - Data transformations using Map, filter and reduce(array methods) - create new arrays based on transforming data from other arrays

//Map - Map array method is similar to forEach method but map creates a brand new array based on original array by applying the call back fn operation - maps the values of the original array to a new array by iterating over it

//Filter - is used to filter for elements in the original array which satisfies a certain condition so the filtered array contains the elements that passed a specified test condition

//Reduce - is used to boil down all original array elements into one single value, eg, adding all elements together with an accumulator variable

//Map method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

//Functional programming - using methods together with call back fns
const movementsUSD = movements.map(function (movement) {
  //return the value that we want the new array to have in the current position
  return movement * eurToUsd;
});

console.log('movements array', movements); //original array is not mutated
console.log('movements array returned from map fn', movementsUSD); //new array returned by map method

//using for of loop - doing exactly the same by manually creating the new array
/* const movementsUSD_1 = [];
for (const move of movements) movementsUSD_1.push(move * eurToUsd);
console.log(movementsUSD_1); */

//using arrow function - one liner call back fn which returns value
const movementsUSD_arrow = movements.map(movement => movement * eurToUsd);
//return the value that we want the new array to have in the current position

//Map also has access to the current array element, current index and the whole array
const movementsDescription = movements.map(
  (move, index) =>
    //string returned stored in the new array - multiple return stmts are acceptable as long as just only 1 is executed
    /* if (move > 0) return `Movement ${index + 1}: You deposited ${move}`;
  else return `Movement ${index + 1}: You withdraw ${Math.abs(move)}`; */
    //no need return stmt since only 1 line in arrow fn
    `Movement ${index + 1}: You ${
      move > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(move)}`
);
console.log(movementsDescription);

//In forEach method we printed each line individually to the console while looping over the array, so in each of the iteration we performed some action that was visible in the console and this is called as side effect - forEach creates side effect but in map mthd we returned each of the string from the call back fn and stored in the new array and finally logged the entire array into the console, so here in this map mthd we didnt create a side effect

//Lecture 8 - Computing usernames
const createUserNames = function (accs) {
  //We dont want to create a new array in this case - modify the objects in the accounts array - so use forEach to modify the existing array
  accs.forEach(function (acct) {
    //modifying the existing object by creating a new prop
    acct.username = acct.owner
      .toLowerCase()
      .split(' ')
      //map creates a new array that can be joined to create username
      .map(name => name[0])
      .join('');
  });
  //const userName = user.toLowerCase().split(' ');
  //callback fn in map should always return value to the new array that the map method is constructing by looping over the existing array
  //const userInitials = userName.map(name => name[0]).join(''); //join by an empty string
  //console.log(userInitials);
};

createUserNames(accounts); //pass in the array instead of using the global variable so that this mthd can work with any similar arguments

//const user = 'Nanny Plum Red Bread'; //username should be 'nprb' - first letter of all words

//Lecture 9 : Transforming method - filter
//we can chain these methods together to get the final result which is not possible while using for of loop
const deposits = movements.filter(function (move) {
  //work with current element
  //should return a boolean value - and for array elements for which the below condition is true will make into the new array - other elements filtered out
  return move > 0;
});
//Only positive values
console.log('movements array filtered using filter mthd', deposits);

//regular for of loop construct
/* depositsFor = [];
for(const move of movements){
  if(move>0)
    depositsFor.push(move)
}
console.log(depositsFor); */
//all positive elements filtered - can also get access to the current index and whole array parameters
const withdrawals = movements.filter(move => move < 0);
console.log('movements array with withdrawals', withdrawals);

//Lecture 10 : Reduce Transformation method

//accumulator(acc) - keeps accumulating the value which ultimately we want to return
const balance = movements.reduce(function (acc, move, index, arr) {
  //reduce loops over the array and calls the callback fn in each iteration
  return acc + move; //acc will be the current sum of all the accumulated value - return it so that new accumulation can be used in the next iteration of the loop
}, 0); //=> second parameter is the initial value of the accumulator
console.log('movements array using reduce method', balance); //every elements boils down to one single value

//using arrow fn
const balanceArrow = movements.reduce(
  (acc, move) => acc + move,
  //reduce loops over the array and calls the callback fn in each iteration
  //acc will be the current sum of all the accumulated value - return it so that new accumulation can be used in the next iteration of the loop
  0
);
console.log('movements array using reduce method', balanceArrow);

//using for of loop construct - it is ok when we need only 1 loop but if the code needs many such looping construct then reduce fn can avoid the necessity of extra variable and return the value
/* let balance2 =0;
for(const mov of movements){
  balance2+=mov;
}
console.log(balance2); */

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, move) => acc + move, 0);
  //to update the text value
  labelBalance.textContent = `${acc.balance}💶`;
};

//movements should be from the account that logged in to the application - if user named nanny logged in then nanny's movements has to be passed into fn
//calcDisplayBalance(account1.movements);

//Maximum number of the movements array - we can use reduce method - return max value in each iteration that needs to be the accumulator value for next iteration - most powerful array method
const maxValue = movements.reduce(
  (acc, move) => (acc > move ? acc : move),
  movements[0]
); //0 might not work when it is a neg array
console.log(maxValue);

//Lecture 11 : Magic of chaining methods
//3 data transformations all in one go - we can filter out the deposits and convert them to USD and get the total deposit in USD
const totalDepositsUSD = movements
  .filter(mov => mov > 0) //returns new array
  .map(mov => mov * eurToUsd)
  //.map((mov,i,arr) => { console.log(arr); mov * eurToUsd;}) ==> array can be printed to console for debugging purposes
  .reduce((acc, mov) => acc + mov, 0); //returning single value in each iteration

//After calling reduce method we cant chain map or filter methods since it doesnt return an array, instead it returned a single value
console.log(totalDepositsUSD);

//We will work on the summary section IN, OUT and INTEREST in bankist app
const calcDisplaySummary = function (acc) {
  //we filter out positive values and add them up together
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}💶`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}💶`;

  //interest is 1.2% of the deposited amount - interest paid each time amount is deposited
  const interest = acc.movements
    .filter(mov => mov > 0)
    //interest calculated for each element and added up together
    .map(deposit => (deposit * acc.interestRate) / 100)
    //to exclude interest that are atleast 1
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}💶`;
};
//calcDisplaySummary(account1.movements);

//Chaining should be optimized for huge arrays- and use minimal chaining as possible
//Bad practice in java script to chain methods that mutate the underlying original array

//Lecture 11 : The Find Method
//Find loops over the array and accepts a call back fn -> Like filter method find also needs a callback fn that returns boolean - but find doesnt return a new array but only returns the first element in the array that satisfies the condition
const firstWithdrawal = movements.find(mov => mov < 0); //returns first element for which call back fn returns true, it doesnt return an array
console.log(firstWithdrawal);

//Using find method we can find retrieve an object in an array based on some property of that object
const accountJessica = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountJessica); //this really helpful where an array contains multiple objects with similar properties

//Goal of find method is to exactly find one element from an array
let accountJonas;
for (const acc of accounts) {
  if (acc.owner === 'Jonas Schmedtmann') accountJonas = acc;
}
console.log(accountJonas);

//Lecture 12 : Implementing Login Functionality in banker app
//Attach event handler to login btn
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

//variable points to the original object in the memory heap
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting/refreshing when clicking - In forms clicking enter in any of the fields will trigger click event on the submit btn
  e.preventDefault();
  //to retrieve value out of an input field use value property
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); //undefined returned if username is not in the list of arrays - so we need to use optional chaining
  console.log('current account found', currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //value from input field is always string
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`; //retrieve the first name alone
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //assignment operator works from right to left, so first empty string assigned to inputLoginPin and then assigned to username

    //To lose focus on input pin field
    inputLoginPin.blur(); //This blur makes the input field loses its focus

    updateUI(currentAccount);
  }
});

//Lecture 12 : Transferring money from one user to another
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  ); //returns the object for which the condition evaluates to true
  console.log(amount, receiverAcc);

  //Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  //To avoid negative transfers - if receiverAcc doesnt exists due to optional chaining "?." it returns undefined and entire && operation will fail, proceeds only if receiverAcc exists and compares if it is different from the current acc
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing Transfer
    currentAccount.movements.push(-amount); //pushing withdrawal neg number
    receiverAcc.movements.push(amount); //pushing deposit into receiverAcc

    //Update UI
    updateUI(currentAccount);
  }
});

//Lecture 13 : FindIndex Method - returns the index of the found element and not the element itself - use case is to close the account and delete the accounts object from the array
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //ES 6 method has access to 3 arguments element, index and entire array
    const index = accounts.findIndex(acc => {
      return acc.username === currentAccount.username; //returns the index of the first element in the array that matches this condition
    });
    console.log(index);
    //deletes one element starting from the index - mutates the underlying array - delete account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }

  //Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputTransferAmount.blur();
});

//Lecture 14 : some and every array method
//includes method on array - true if an array includes a certain value
console.log('movements array - includes mthod', movements.includes(-130));
//But we can only test only equality

//But if we want to test for a condition then we should use some method
//To know if there are any positive movements in this array - any deposits > 0
const hugeDeposits = movements.some(mov => mov > 5000);
console.log('Checking for huge deposits in movements: ', hugeDeposits);

//rewriting the equality comparison with some method
console.log(
  'equality comparison with some:',
  movements.some(mov => mov === -130)
);
//For any value if this condition evaluates to true then some mthd returns true or else false

//Loan feature - use case
//loan granted only if there is atleast 1 deposit that is greater than or equal to 10% of the requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add loan amount as positive movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//separate call back and reuse it - DRY
const deposit = mov => mov > 0;

//every - array method - returns true only if all the elements in the array pass the condition in the call back fn
console.log('every method', movements.every(deposit)); //checking if all of the movements are positive/deposits

//account4 has only deposits for which every method condition pass for all elements
console.log('every mthod - only deposits', account4.movements.every(deposit));

//Lecture 15 : Flat and FlatMap array method - ES 2019
const sampleArr = [[1, 2, 3], [8, 9, 10], 12, 13];
console.log('Flatened array by removing nested arrays', sampleArr.flat()); //destructed the arrays within the main array - works with one level deep

//With deep nested arrays
const sampleNestedDeep = [[1, [2, 3, 4]], [8, 9, [10, 11]], 12, 13];
console.log('Flatened deep nested array', sampleNestedDeep.flat()); //flat mthod goes only 1 level deep and destructures it - default depth is 1

//We can go 2 levels deep and destructure it by specifying the depth argument
console.log('Flatened deep nested array', sampleNestedDeep.flat(2));

//Usecase - Bank wants to calculate the overall balance of all the movements of all the accounts
const accountMovements = accounts.map(acc => acc.movements); //returns new array that contains the movements array from each account
const allMovements = accountMovements.flat(); //one level of nesting only needed
console.log(
  'All movements reduced',
  allMovements.reduce((acc, mov) => acc + mov, 0)
);

//Chaining - Flat method
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log('overallBalance with chaining mthds', overallBalance);

//Usually map and flat methods are used together - so flatMap was introduced to combine the operations of both Map and flat methods - receives call back and flatens the result array
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log('overallBalance with flatMap mthds', overallBalance2);
//flatMap can only go one level deep and we cant change the depth of destructuring

//Lecture 16 : Sorting Arrays
//Strings
const owners = ['Nanny Plum', 'Red Bread', 'Wise Olf Elf', 'Princess Holly'];
//Sort method mutates the original array - changes the order in the owners array
console.log('Sorted array', owners.sort());

//Numbers
console.log(movements.sort()); //Doesn't order it correctly, because sort mthd does sorting based on strings(by default converts everthing to string and does sorting - so displays as 1,2, 3,4,5,... but can be fixed by sending a call back function to sort mthd)

//sort method looping over the array and takes 2 arguments current value and the next value
// movements.sort((a,b)=>{
//   //return value < 0, A and then B (keep the order)
//   //return value > 0, A after B (switch numbers)
//   if(a > b){
//     return 1;
//   }
//   if(b > a){
//     return -1;
//   }
// })
movements.sort((a, b) => a - b); //if 0 returned the position remains unchanged
// To sort in ascending order
console.log('Ascending order', movements); //mutates original array

//Descending order
// movements.sort((a,b)=>{
//   //return < 0, A and then B (keep the order)
//   //return > 0, A after B (switch numbers)
//   if(a > b){
//     return -1;
//   }
//   if( b > a){
//     return 1;
//   }
// })
movements.sort((a, b) => b - a);
console.log('Descending order', movements);

//Lecture 17 - Programmatically create and fill arrays
//If we have the data that we want to be in the array then we can manually create the array uisng [] construct
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log('manual array creation', arr);
//create array without having to define all the elements manually
console.log('using new array method', new Array(5)); //creates new array with 5 empty elements in there,
const emptyArray = new Array(7); //map mthod cant work on empty array
//emptyArray.fill(3); //fill up empty array with the supplied value
//can also specify 2nd argument as the begin parameter
emptyArray.fill(3, 3, 5); //only starting from 3rd position uptill (5th position-1) fills the "3" value
console.log(emptyArray);

arr.fill(23, 4, 6); //mutates the original array
console.log(arr);

//To recreate "arr" array programatically - Array.from function - using it on a Array constructor
const arrFunc1 = Array.from({ length: 7 }, () => 1); //to return 1 in each iteration and create array of length 7 , no arguments
console.log(arrFunc1);

const arrFunc2 = Array.from({ length: 7 }, (_, i) => i + 1); //callback fn can get access to current element and current index - similar to calling map method on an empty array - can also use a "throw away" variable since it is not needed, but still the first parameter has to be defined
console.log(arrFunc2);

//from function - Introduced into JS to create array from array like structures - like strings maps or sets - create arrays from (iterables)
//convert nodeList into an array to take advantage of all array methods
//Get the movements from UI and refractor by removing currency sign
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    dom => Number(dom.textContent.replace('💶', ''))
  ); //creates an array with elements from first argument and fills it with second call back function parameter which transforms the initial array
  // console.log(movementsUI.map(dom=> Number(dom.textContent.replace('💶',''))));
  console.log('Programatically creating arrays', movementsUI);

  //can also create an array with spread operator
  // [...document.querySelectorAll('.movements__value')]
});

//Lecture 18 - Summary of array methods
//23 array methods - push, unshift, pop, shift,splice, map, filter,slice, reduce, forEach, find, findIndex, indexOf, join, includes, some, every, flat, flatMap, concat, fill, sort, reverse

//Lecture 19 - Array Methods Practice
//1. flatMap
const depositsTotal = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log('Total deposits sum', depositsTotal);

//2. How many deposits with atleast 1000$
// const numDeposits1000 = accounts.flatMap(acc=>acc.movements).filter(mov=> mov >= 1000).length;
// console.log("deposits with atleast 1000$",numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0); //update initial value based on the condition in the call back fn - accumulator reduced to a counter which stores number of values >= 1000$
console.log(numDeposits1000);

// Postfixed and Prefixed ++ Operator
let incrementOp = 10;
console.log(incrementOp++); //still returns the older value and then increments it so cant use it in reduce fn which will return only 0 if we use acc++ - but we can use prefixed ++ Operator
console.log(incrementOp); //incremented

//3. Create new object from reduce method
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr); //should return the accumulator object
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  ); // can also directly destructure object

console.log(sums);

//Object value as accumulator
const { depositsSum, withdrawalsSum } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      sums[curr > 0 ? 'depositsSum' : 'withdrawalsSum'] += curr;
      //should return the accumulator object
      return sums;
    },
    { depositsSum: 0, withdrawalsSum: 0 }
  ); //same name for destructuring
console.log(depositsSum, withdrawalsSum);

//4. Convert string to title case - string and array mthds
//this is a nice title => This Is a Nice Title => a is an exception
const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');
  //But is and is at the beginning it should be capitalized
  return capitzalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
