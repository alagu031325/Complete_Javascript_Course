/****************************************
 * Values and Variables
 ***************************************/
const js = "amazing";
//To access developer console
console.log(40 + 8 + 23 - 10);

//Variable declaration - assign a value to the variable
const firstName = "Alagu";
let myJob = "developer";
console.log(firstName); //referencing variables

//Follow camel case notation
//Variable name cant start with a number, Variable name can only contain
//letters, numbers, _ or $ sign
//Cant use reserved javascript keywords as variable names
//We should not start a varible in uppercase letter
//Constants must be defined in UPPERCASE letters
//Variable names should be descriptive

/****************************************
 * Primitive Data types
 ***************************************/
//In Javascript values has type not the variables
// No need to manually define the type of the value stored in the variable and can change the type of value stored in a variable at runtime - hence dynamically typed language

let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof true);

//To declare a new variable use let - to reassign the value of variable dont use let
javascriptIsFun = "YES!";
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);

//undefined and null variable
let year; //Empty variable declaration - automatically assigned to "undefined" value, A function without a return stmt also returns "undefined", If we try to access a object property that doesnt exist then we get "undefined"
console.log(year);
console.log(typeof year);
year = 1992;
console.log(typeof year);
console.log(typeof null); //"object" - null represent that the object value is empty, needs to explicitly assigned
 
/****************************************
 * let,var and const
 ***************************************/
// use let keyword when we have to mutate the variable - block scoped
// use const keyword when the value in a variable cant be changed in the future - immutable variable
//const needs a mandatory initial value
//var - legacy way- mutable varibles - function scoped

myLastName = "Arunachalam"; //Not a good practice should declare all variables

/****************************************
 * Basic Operators
 ***************************************/
//Arithmetic operators - "+","-","*","/"

const currentYear = 2023;
const birthYearAlagu = 1992;
const birthYearSubbu = 1986;
const ageAlagu = currentYear - birthYearAlagu; //31
const ageSubbu = currentYear - birthYearSubbu; //37
console.log(ageAlagu, ageSubbu);
console.log(ageAlagu * 2, ageSubbu / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3
//String concatenation
const myFirstName = "Alagu";
const myLastName = "Arunachalam";
console.log(myFirstName + " " + myLastName);

//Assignment Operator - "="
let addValues = 100 + 50; // addValues is 150
addValues += 25; // addValues = addValues+25
addValues *= 2; // 175*2 = 350
addValues++; //351
addValues--; //350
addValues--; //349
console.log(addValues);

//Comparison operators - ">","<",">=","<="
console.log(ageAlagu > ageSubbu);
console.log(ageSubbu >= 37); //Age of subbu is atleast 37(greater or equal to 37)

/****************************************
 * Operator Precedence
 ***************************************/
console.log(currentYear - ageAlagu > currentYear - ageSubbu);
//precedence of "-" is 14 that is greater than the precedence of ">" operator (12) - usually Arithmetic operators have greater precedence than the comparison operators

//the associativity of an operator determines the order of evaluation when multiple operators of the same precedence appear in an expression
console.log(25 - 10 - 5); //left to right execution (Arithmetic operators)
let variableX, variableY;
variableX = variableY = 55 + 10; //right to left execution (Assignment operator)
console.log(variableX, variableY);
console.log((ageAlagu + ageSubbu) / 2); //Grouping has highest precedence

/****************************************
 * Template Literals
 ***************************************/
const alaguDescription = `I'm ${firstName}, a ${
  currentYear - birthYearAlagu
} years old ${myJob} !!`;
console.log(alaguDescription);
//If we use backticks,we can easily insert variables in strings
console.log(`Just a regular string...`);
//Multi line string
console.log(
  "String with \n\
multiple line of code"
);

//ES6
console.log(`String with multiple
lines of code`);

/****************************************
 * If Else Stmts
 ***************************************/
const ageSarah = 15;
const isOldEnough = ageSarah >= 18;
//if can have condition that evaluates to a boolean value
if (isOldEnough) {
  console.log("Sarah can apply for driving license 🚗");
} else {
  const yearsLeft = 18 - ageSarah;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years 👍`);
} //else is optional

let century;
//Any variable declared inside of the code block will not be accessible outside
if (birthYearAlagu <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

/****************************************
 * Type Conversion/Coercion
 ***************************************/
const inputYear = 1992;
console.log(Number(inputYear) + 18);
//NaN is an invalid number - returned when operations involving number cant return a new number
console.log(Number("Uma"));
console.log(typeof NaN); //is a "number"
//Converts number to string
console.log(String(23));

//Type Coercion - type conversion done automatically by javascript under the hood
console.log("23" - "10" - 3);
console.log("23" * "2"); //sub, division and multiplication converts strings to numbers

console.log("23" + 3); //But addition operator converts number to strings when involving strings

let n = 2 + 3 + 4 + "5"; //output 95
n = "10" - "4" - "3" - 2 + "5"; //output 15

/****************************************
 * Truthy and Falsy Values
 ***************************************/
//5 falsy values: 0, '', undefined, null, NaN
//Any number that is not '0' or any string that is not
// empty string will be converted to true
console.log(Boolean(undefined));
console.log(Boolean("Alagu"));
console.log(Boolean("")); //empty string - false
console.log(Boolean({})); // empty object - true

//Coercion
const money = 0;//converts to bollean
if (money) {
  // money is automatically converted to boolean by js
  console.log("Hard earned, Keep it up");
} else {
  console.log("Find a job soon!!");
}

let height; // Even if height is assigned to 0, then it returns ht undefined but can be fixed with logical operators
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}

/****************************************
 * Equality Operators
 ***************************************/
// const ageJonas = 18;
// if (ageJonas === 18) {
//   // strict equality operator - returns true if exactly equal - no type coercion
//   console.log("You just became an adult");
// }
// //Loose equality operator has many rules so best practice to always use strict equality operator using manual type conversions if needed
// if ("18" == 18) console.log("Tested with loose equality operator"); // Performs type coercion( string converted to number)

// //prompt function
// const favourite_number = Number(prompt("What is your favourite number"));
// console.log(favourite_number);

// //If - else if construct - can have any number of "else if" conditions
// if (favourite_number === 25) {
//   console.log("Amazing! That's my favorite number too");
// } else if (favourite_number === 7) {
//   console.log("It's a cool number too:)");
// } else {
//   console.log("My Best Wishes!");
// }

// //!= and !== --> loose and strict versions of not equal to check
// if (favourite_number !== 25) console.log("Why not 25!");
// else if (favourite_number !== 0) console.log("Good Choice");

/****************************************
 * Logical operators - and, or and not
 ***************************************/
//Not(!) operator has precedence over 'and' and 'or' operator
//and(&&) - any one is false the expression evaluates to false
//or(||) - any one variable is true the expression evaluates to true
const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense); //inverts value

const shouldDrive = hasDriversLicense && hasGoodVision;
// if (shouldDrive) console.log("Sarah can drive");
// else console.log("Someone else should drive");

const isTired = false;
if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah can drive");
} else console.log("Someone else should drive");

/****************************************
 * Switch Statements
 ***************************************/
const day = "January";

switch (
  day //strict equality comparison
) {
  case "Monday": //day === 'Monday'
    console.log("Plan the course structure");
    break;

  case "Tuesday":
    console.log("Go to coding meetup");
    break;

  case "Wednesday":
  case "Thrusday": //This block executed for both conditions
    console.log("Prepare coding lecture videos");
    break;

  case "Friday":
    console.log("Record videos");
    break;

  case "Saturday":
  case "Sunday":
    console.log("Enjoy the weekend :)");
    break;

  default: //default block
    console.log("Not a valid day");
}

/****************************************
 * Statements and Expressions
 ***************************************/
//Expression is a piece of code that produce value,  eg: 1992, true && false && !false, etc
//Statements doesnt produce any value - if else stmts
if (true) {
  const str = "My name is Alagu"; //Performs actions that the program need to do
}

//Template literals expect expressions and not
//statements
console.log(`I'm ${2023 - 1992} years old`);
//cant use if else stmts inside template literals

/****************************************
 * Conditional Operators - Ternary
 * Used to take quick decisions
 ***************************************/
const currentAge = 23;
//If else construct in one line
currentAge >= 18
  ? console.log("You are eligible to drive")
  : console.log("You can ride cycles");

//Operators return values
const drive = currentAge >= 18 ? "drive bike" : "drive cycle";
console.log(drive);

//since ternary operator return value, it can be used as expressions in template literals
console.log(`I like to drive ${currentAge >= 18 ? " bike" : "cycle"}`);
