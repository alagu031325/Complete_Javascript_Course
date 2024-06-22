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
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Section 11 - Lecture 1 
//Simple array methods - methods are simply fns that we can call on objects - all arrays created in JS will have this methods attached - so arrays are objects that has access to build in methods

//SLICE

let testArray = ['a','b','c','d','e']
//very similar to slice method that is available on strings - with slice mthd we can extract part of any array without changing the original array 

console.log(testArray.slice(2));//from index 2 till end - slice method returns a new array with extracted parts
console.log(testArray.slice(1,4));//end parameter value not included - length is (4-1) => end parameter - start parameter
console.log('Last element',testArray.slice(-1));//retrieves the last element in any array 
console.log('Last 2 elements',testArray.slice(-2));//retrieves the last 2 elements in any array
console.log('except last 2 elements',testArray.slice(1,-2));//starting at testArray[1]
console.log(testArray.slice());//helps to make shallow copy of any array
//Also we can use spread operator to create shallow copies - [...testArray] - copies element of testArray into a new array

//SPLICE - works in almost same way as slice, but it mutates or changes the original array - Usually used to delete 1 or more elements from an array 

//console.log(testArray.splice(2));//new array with 3 elements returned 
//console.log(testArray.splice(-1)); removes the last element from the original array
console.log("deleting array elements",testArray.splice(1,2));//second argument is the delete count, so starting from position 1 delete 2 elements 
console.log("resultant array",testArray); //but original array is modified, the extracted elements are removed from this array

//Reverse
testArray = ['a','b','c','d','e'];
const testArray2 = ['j','i','h','g','f']
console.log(testArray2.reverse());//reverse method mutates the original array 

//Concat method - to join two arrays
const letters = testArray.concat(testArray2);//first array is on which the method is called and second array is joined with the first array 
console.log(letters);
//exact same thing can also be achieved through spread operator
console.log([...testArray,...testArray2]);//doesnt mutate the existing array as concat

//JOIN - with a separator
console.log(letters.join('--'));//result is a string with the specified separator

//Lecture 2 - The new 'AT' method - ES 2022

const newArray = [23, 11, 64];
//Can replace traditional bracket notation with more modern looking 'at' method
console.log(newArray[0]);
console.log(newArray.at(0));

//To retrieve last element in an array - 2 traditional ways are to use bracket notation and the slice method
console.log("last element - bracket notation",newArray[newArray.length - 1]);
console.log("last element - slice mthd",newArray.slice(-1)[0]);//slice returns an array so to retrieve value we use bracket notation

console.log("last elem at method",newArray.at(-1));//retrieves the last element
//'at' method mainly used to retrieve last elem easily and for method chaining

//'at' method also works on strings
console.log('retrieve letter from a string - ','plum'.at(1));
console.log('retrieve last letter from a string - ','plum'.at(-1));

//Lecture 3 - Looping Arrays - Foreach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];// array containing deposits and withdrawal

for (const [i,movement] of movements.entries()) {//to access counter variable we use entries method
{
  if(movement > 0)
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  else
    console.log(`Movement ${i+1}: You withdraw ${Math.abs(movement)}`);
}
}

//More readable
console.log('-----FOR EACH ----------');
//forEach method will loop over the array and for iteration calls the call back fn - while calling it will pass the current element of the array as the argument along with its index and the entire array 

//We can either use one or two or three arguments - names can be anything but the order is the same, 1st parameter is the "current element", 2nd parameter points to the index and the third points to the entire array that is being looped

movements.forEach(function(movement, index, array) { //forEach is a highorder fn which requires callback fn to tell it what to do
  if(movement > 0)
    console.log(`Movement ${index+1}: You deposited ${movement}`);
  else
    console.log(`Movement ${index+1}: You withdraw ${Math.abs(movement)}`);
});

//When to use forEach and for of loop - We cant break from forEach loop, continue or break statements dont work in forEach - it will loop over the entire array then only it ends - if we need to break out of loop in the middle then we should continue using for of loop

//Lecture 4 - For each with Maps and Sets
//Map
const currencies = new Map([
  ['USD', 'United States dollar'], //key and value of one map entry
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//first parameter is current value and second is current key - order cant be altered
currencies.forEach(function(value, key, map){
  console.log(`${key} : ${value}`);
});

//Set
const currenciesUnique = new Set(['USD','GBP','USD','EUR','INR']);
console.log(currenciesUnique);//will have only unique values
currenciesUnique.forEach(function(value, key, map){ //second parameter is assigned the value of the first parameter since key is not there in Set
  console.log(`${key} : ${value}`); //key is same as value since a set doesnt have index or neither a key 
})