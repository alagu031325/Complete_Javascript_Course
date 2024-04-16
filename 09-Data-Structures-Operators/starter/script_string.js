'use strict';

console.log('Section 9 - Working with strings');

//Lecture - 1
//Strings index access and length
const airline = 'Air India-Redefined';
const plane = 'A320';

console.log(plane[0], plane[2]);
console.log('Direct index access', 'B737'[1]); //we can directly access using the index values

console.log(airline.length);
console.log('Direct length computation', 'B737'.length); //We can directly access the length property on a string

//String methods
//This gives the first occurrence of the element
console.log('IndexOf', airline.indexOf('r'));
//To get the last occurrence of the element
console.log('lastIndexOf', airline.lastIndexOf('i'));
//Search for entire word
console.log('word search', airline.indexOf('India')); //returns -1 if word not found - case sensitive

//Slice method - used to extract part of a string with its indexes
console.log(airline.slice(4)); //4th parameter is the beginning index from which another substring is extracted
//This doesnt change the value of underlying strings since strings are immutable

//Similary we can also give end index in the slice method and element at the end value is not Included in the substring
console.log(airline.slice(4, 9)); //length of extracted string is 9-4 = 5

console.log('To extract first word', airline.slice(0, airline.indexOf(' ')));
console.log(
  'To extract last word',
  airline.slice(airline.lastIndexOf(' ') + 1) //If no end parameter simply extracts everything until the end
);

console.log('Extracting words from the end', airline.slice(-5)); //starts extracting from the end
console.log('Extracting words with + and - indexes', airline.slice(1, -1)); //can have positive inital parameter and negative last parameter - 0 and -1 is not included rest of the word is extracted

const checkMiddleSeat = function (seat) {
  //B and E are middle seats in small planes like boeing
  const lastChar = seat.slice(-1); //counting from the last element
  if (lastChar === 'B' || lastChar === 'E')
    console.log('You got the middle seat 😐');
  else console.log('You are lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

//Strings are primitives but why do they have methods like objects? Whenever we call a method on a string JS converts the string primitive to string object with the same content and then it is on that objects methods are called - This is called Boxing
const stringObj = new String('Nanny Plum'); //this convertion is done behind the hood whenever methods are called on string variables, when operation is done the object is converted back to string primitive

console.log(stringObj); //creates a string object with accessible methods
console.log(typeof stringObj);
//all string methods return primitive even when called on string object
console.log(typeof stringObj.slice(1));

//Lecture - 2
//can use these methods directly on a string
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Fix capitalization in passenger name
const passenger = 'nAnNY pLuM'; //Nanny plum

const passengerName = function (passenger) {
  const passengerLower = passenger.toLowerCase();
  const passengerName = passenger[0].toUpperCase() + passengerLower.slice(1);
  return passengerName;
};
console.log(passengerName(passenger));

//Comparing user entered email
const email = 'hello@gmail.com';
const loginEmail = '   Hello@gmail.com  \n'; //also enters a new line mistakenly

//convert everything to lowercase for comparison
/* const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); */

const normalizedEmail = loginEmail.toLowerCase().trim(); //returns string on which trim method can be used
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//From ES19 - trimStart and trimEnd  - to trim whitespaces only from the start or only from the end of the strings

//replacing part of a string - replace methods are case sensitive
const priceIndia = '288,97Rs';
const priceUS = priceIndia.replace('Rs', '$').replace(',', '.'); //first argument is the string to be replaced
console.log(priceUS);

//replace entire words
const announcement =
  'All passengers come to boarding door 23, Boarding door 23!';
console.log(announcement.replace('door', 'gate')); //Only replace the first occurrence of the search string

//regular expressions - to create them write the strings within /string/ not between quotes
//The optional g flag in a regular expression pattern stands for "global," and when used, it indicates that the replacement should be done globally (i.e., replace all occurrences, not just the first one).
console.log(announcement.replace(/door/g, 'gate')); //g stand for global

//methods that return booleans - includes, startsWith and endsWith
const newPlane = 'Airbus A320neo';
console.log(newPlane.includes('320'));
console.log(newPlane.includes('boeing'));
console.log(newPlane.startsWith('Air'));

if (newPlane.startsWith('Airbus') && newPlane.endsWith('neo')) {
  //case sensitive
  console.log('Part of the New Airbus Family');
}

// Practice Exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed to board');
  } else {
    console.log('Welcome Onboard!');
  }
};
checkBaggage('I have a laptop, some Food and a Pocket Knife');
checkBaggage('Socks and Camera');
checkBaggage('Got some Water and Snacks and also a gun for protection');

//Lecture - 3
console.log('a+very+nice+string'.split('+')); //splits the string with + sign and stores the results as elements of a new array
console.log('Nannu Plum'.split(' '));

//use the power of destructuring
const [firstName, lastName] = 'Alagu Arunachalam'.split(' '); //easier way than using slice method
console.log(firstName, lastName);

//join method - opposite of split method
const properName = ['Mrs.', firstName, lastName.toUpperCase()].join(' '); //joins all the elements of the array with the join sting here it is space (can also use '-','#' any string)
console.log(properName);

//easy to use join method to capitalize names

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const nameItem of names) {
    namesUpper.push(nameItem[0].toUpperCase() + nameItem.slice(1));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('kind and queen thistle');
capitalizeName('nanny plum fairy maid');

const testStr = 'holly';
//alternate method to capitalize
console.log(testStr.replace(testStr[0], testStr[0].toUpperCase()));

//Padding
const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(30, '+')); //pads the original string with supplied string so that it is 25 char length - length of the inital string is 25 and padEnd adds 5 '+' at the end since the new length is 35

//Padding use case
const maskCreditCard = function (number) {
  //to convert number to a string - we can typecast or use + operator
  const str = number + ''; //If one of the operands is string the rest are also converted to a string
  const last = str.slice(-4); //retrieve last 4 char to mask them
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(303245679809));
console.log(maskCreditCard('320999001234555988'));

//Repeat - repeats the same string multiple times
const warningMessage = 'Bad weather... All Departures Delayed... ';
console.log(warningMessage.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
planesInLine(12);
planesInLine(3);
