"use strict"; // To activate strict mode for entire script
//Creates visible errors instead of failing silently and forbides to do certain things.

let hasDriversLicense = false;
const passTest = true;

//Reference errors thrown to console with strict mode
if (passTest) hasDriversLicense = true;
//Without strict mode the mispelt variable name will be created by js and assigned with 'true' value automatically
//console.log(hasDriverLicense);
if (hasDriversLicense) console.log("I can drive");

//has a list of strict mode reserved words which might be introduced in future releases like "interface","private"
//const interface = "Audio";

/*****************************************
 * Functions in JS - Function declarations
 ****************************************/
//chunks of code that is reusable
function logger() {
  console.log("My name is Alagu:)");
}
// Invoking/ calling / running the function
//Function can also receive data and return data back
logger();
//parameters - variables defined when this function gets called
function fruitProcessor1(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}
// Actual values to the parameters are called arguments which gets assigned to the function parameters
const appleOrangeJuice = fruitProcessor1(3, 5);
console.log(appleOrangeJuice);

const appleJuice = fruitProcessor1(5, 0);
console.log(appleJuice);

const orangeJuice = fruitProcessor1(0, 10);
console.log(orangeJuice);

/*****************************************
 * Functions Expressions
 ****************************************/

//birthYear is a local variable available only to this function
let currentYear = 2023;
//Function declaration
function calcAge1(birthYear) {
  return currentYear - birthYear;
}
//Function declarations can be called from the code before they are defined
const currentAge1 = calcAge1(1992);
console.log(currentAge1);

//Anonymous function - A function without a name
//Function expression - produce values
// Can be called only after they are defined
const calcAge2 = function (birthYear) {
  return currentYear - birthYear;
};
const currentAge2 = calcAge2(1992);
console.log(currentAge2);

/*****************************************
 * Arrow Function -ES6
 ****************************************/
//Arrow Functions - return happens implicitly - this is excellent for simple one liner functions, return needed for multi line functions
const calcAge3 = (birthYear) => currentYear - birthYear;
const currentAge3 = calcAge3(1992);
console.log(currentAge3);

//Multiple line of code and with multiple parameters
const retirementAge = 65;
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = currentYear - birthYear;
  const retirement = retirementAge - age;

  if (retirement > 0) {
    console.log(`${retirement} years left until retirement for ${firstName}.`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🥳`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1992, "Alagu"));

/*****************************************
 * Functioncalling other functions
 ****************************************/
//Function to be called from fruitProcessir function
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor2(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces`;
  return juice;
}
console.log(fruitProcessor2(2, 3));
/*****************************************
 * Arrays
 ****************************************/
const friends = ["Rob", "Ben", "Holly"];
console.log(friends);
console.log(friends[0], friends[2]); //0 based

const years = new Array(1991, 1984, 2008, 2020, 2023);
console.log(years.length); //gives exact number of elements
console.log(years[years.length - 1]); //the square brackets can have expression that produce value

//Mutate the array
friends[2] = "NannyPlum";
console.log(friends);

//We cant reassign to const variable but we can change values because arrays are mutable - only primitive data types are immutable
//friends = ["Mr.Elf","Mrs.Elf"] --> Not possible

//While the binding (the variable itself) is constant, the contents of the object or array can be modified. This is because objects and arrays in JavaScript are mutable, "const" provides immutability for the binding (variable name), it doesn't make the values themselves immutable. For primitive data types (like numbers, strings, and booleans), the value is immutable

const firstName = "Alagu";
const lastName = "Arunachalam";
//Array can have multiple types of data - including arrays inside another array and expressions
const relaventData = [firstName, lastName, 2023 - 1992, "Learner", friends];
console.log(relaventData);

//Exercise
function calcAge(birthYear) {
  return currentYear - birthYear;
}
const ages = [];
for (let i = 0; i < years.length; i++) {
  //We can place function calls in an array which then evaluates to a value
  ages[i] = calcAge(years[i]);
  //ages.push(calcAge(years[i]))
}
console.log(ages);
/*****************************************
 * Basic Array Operations
 ****************************************/
//const friends = ["Rob", "Ben", "NannyPlum"];

//Add elements to the last of the array
const newLength = friends.push("Holly"); //returns length of the array after pushing the element
console.log(friends, newLength);

//Add element to the beginning of the array
friends.unshift("Poppy"); //returns length of the array
console.log(friends);

//To remove elements from the array
const poppedElement = friends.pop(); //remove the last element
console.log(friends, poppedElement);

//To remove the first element from the array
friends.shift(); //returns element that is removed
console.log(friends);

console.log(friends.indexOf("Ben")); //returns index
console.log(friends.indexOf("Holly")); //Not in array = returns -1

//ES6 method -
console.log(friends.includes("Ben")); //returns boolean value
console.log(friends.includes("Holly")); //uses strict equality operator

if (friends.includes("Ben")) {
  console.log("Hurray! You have a friend named Ben");
}
/*****************************************
 * Introduction to Objects
 ****************************************/
//Key value pairs, unlike array each value can be mapped to a key eg: firstName(key): "Alagu"(value)
//Each key is considered as a property that corresponds to that object
//Object literal - easiest way to create object
const studentDetails = {
  firstName: "Alagu",
  lastName: "Arunachalam",
  age: 2023 - 1992,
  job: "student",
  friends: ["Nanny Plum", "Daisy", "Poppy"],
};
//The order of the values deosnt matter while retrieving them - but arrays are accessed using the order in which we insert them
//Arrays => Ordered data
//Objects => unstructured data
/*****************************************
 * Retrieve data from Objects
 ****************************************/
//Dot and Bracket notation
console.log(studentDetails);
//Dot operator - can use only real property name
console.log(studentDetails.lastName);
//Bracket - we can give any expression which evaluated to a value instead of giving the string
console.log(studentDetails["job"]);

//Get property from user
// const interestedIn = prompt(
//   "What do you want to know about me? Choose between firstName, lastName, age, job and friends"
// );
const interestedIn = "job";
//If value exists then it is a truthy value not undefined
if (studentDetails[interestedIn]) console.log(studentDetails[interestedIn]);
//If string is empty or number is 0 or undefined
else
  console.log(
    "Property not found!Choose between firstName, lastName, age, job and friends"
  );

//To add property to the objects
studentDetails.location = "United Kingdom";
studentDetails["college"] = "University of Leicester";
console.log(studentDetails);

console.log(
  `${studentDetails.firstName} has ${studentDetails.friends.length} friends, and his best friend is called ${studentDetails.friends[0]}`
);

/*****************************************
 * Object Methods
 ****************************************/
const myDetails = {
  firstName: "Alagu",
  lastName: "Arunachalam",
  birthYear: 1992,
  job: "student",
  friends: ["Nanny Plum", "Daisy", "Poppy"],
  hasDriversLicense: true,
  // We need function expressions to create this method
  // calcAge: function (birthYear) {
  //   return 2023 - birthYear;
  // },

  //calcAge: function () {
  //It is a good idea to reference an object intead of hard coding an object
  //console.log(this); -->this keyword points to jonas object that is calling the method
  //return 2023 - this.birthYear; //this equals to the object on which this method is called/or object calling the method
  //},

  //Calculate age once and store it in a Object's Property
  calcAge: function () {
    this.age = 2023 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    this.summary = `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }, and she has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
    return this.summary;
  },
};
console.log(myDetails.calcAge());
// console.log(myDetails["calcAge"]());

//We calculate the age once, by calling the function and then retrieve the age property thereon - without recalculating

console.log(myDetails.age);
console.log(myDetails.getSummary());
console.log(myDetails.summary);

/*****************************************
 * Loops - Control Structures
 ****************************************/
//For loop statement - used for repetition tasks
//Define a counter variable
//THe loop runs as long as the logical condition evaluates to TRUE
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
}

/*****************************************
 * Looping Arrays - Control Structures
 ****************************************/
//const relaventData = [firstName, lastName, 2023 - 1992, "Learner", friends];
const typesOfArray = [];
//relaventData[5] --> doesnt exist since array base starts at 0
for (let counter = 0; counter < relaventData.length; counter++) {
  //Reading from an array
  console.log(relaventData[counter]);
  //Filling an array from existing array
  //typesOfArray[counter] = typeof relaventData[counter];
  typesOfArray.push(typeof relaventData[counter]);
  //Adds element to the end of the array - push
}
console.log(typesOfArray);

//const years = new Array(1991, 1984, 2008, 2020, 2023);
//const ages;
// Number - array = Nan ( Will not work)

//continue statement
console.log("----Only Strings -----");
for (let counter = 0; counter < relaventData.length; counter++) {
  //Skip elements whose type is not a string
  if (typeof relaventData[counter] !== "string") continue;
  //continue keyword immediately exits the current iteration
  console.log(relaventData[counter], typeof relaventData[counter]);
}

//Break statement
console.log("----Break with Number -----");
for (let counter = 0; counter < relaventData.length; counter++) {
  //Break iteration as soon as a Number is found
  if (typeof relaventData[counter] === "number") break;
  //break keyword immediately terminates the for loop
  console.log(relaventData[counter], typeof relaventData[counter]);
}

/*****************************************
 * Looping Arrays - Backwards
 ****************************************/
for (let counter = relaventData.length - 1; counter >= 0; counter--) {
  console.log(relaventData[counter], counter);
}

/*****************************************
 * Loops inside loops
 ****************************************/
// for (let exercise = 1; exercise < 4; exercise++) {
//   console.log(`----Starting Exercise ${exercise}-----`);
//   for (let rep = 1; rep < 6; rep++) {
//     console.log(` Exercise ${exercise} - Lifting weights repition ${rep}`);
//   }
// }

/*****************************************
 * While loop
 ****************************************/
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
// }

let counter = 1;
//The loop runs until this condition evaluates to true
console.log("----While Loop-----");
//While loop is more versatile and can be used in larger variety of situations than for loop - because it just needs a condition that evaluates to true - doesnt need a counter variable for its execution
// while (counter <= 5) {
//   console.log(`Lifting weights repetition ${counter} 🏋️‍♂️`);
//   counter++;
// }

//Problem without a counter
// Keep rolling a dice until we roll a "6" - we dont know how many times the loop should run
let dice = Math.trunc(Math.random() * 6) + 1; // generates random number between 0 and 1
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Hurray the dice is 6, Bye!");
}
