'use strict';

console.log('Section 10:Closer look at the functions');

//Lecture 1 : default parameters
//Functions with some parameters set by default - we dont have to pass them manually if in case we dont need to change the default
const bookings = [];

//ES 6 - default values can contain any expression like price being 199 * 1.2 and we can also calculate the default values based on the prev values set
const createBooking = function (
  flightNum,
  numPassengers = 2,
  price = 199 * numPassengers
) {
  //ES 5
  //numPassengers = numPassengers || 1;
  //price = price || 199; --> if first operand is falsy value then it assigns the default value

  const booking = {
    //Enhanced object literal syntax
    flightNum, //instead of flighNum: flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', '3', '899');
createBooking('LH123', '5');
//we cant skip arguments in JS or to skip we need to set it to undefined
createBooking('LH321', undefined, '799'); //no value so takes the default value

//Lecture 2: How passing aruments works: Value vs Reference
const flight = 'LH234';
const passengerDetails = {
  name: 'Nanny Plum',
  passport: 24739479284,
};

//flightNo is a copy of the original value since it is a primitive type, like flightNum = flight (that is passed as argument), but when we pass a reference type to a function, the reference to the object in the heap memory is copied and hence both the varibles point to the same object
const checkIn = function (flightNo, passenger) {
  flightNo = 'LH999';
  passenger.name = 'Ms.' + passenger.name;

  if (passenger.passport === 24739479284) {
    //passport no needs to be retrieved from db in real time
    console.log('Checked In');
  } else {
    console.log('Wrong Passport!');
  }
};

checkIn(flight, passengerDetails);
console.log(flight, passengerDetails);

//Problems with copy reference value of objects
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

//Different functions working on same objects can create issues
newPassport(passengerDetails); //passport number is manipulated
checkIn(flight, passengerDetails); //Hence checking failed

//passing by value
//passing by reference - JS doesnt have pass by ref it has only pass by value, even when passing objects we still copy the ref which is in turn a value that contains memory address, we pass a reference to a function but we dont pass via reference

//Lecture 3: First class and higher order functions
//First class functions(it is a concept) functions that are simply values - an another type of object -
//1) Since fns are values we can store functions in variables or assign it to object properties
//2) Pass functions as arguments to OTHER functions - like passing event handlers as value to addEventListener function
//3)Can also return functions from other functions
//4) Functions are objects - like object methods there are also function methods
//5) First class functions helps us to write higher order functions - like a function that receives another fn as argument(callback function) and that returns a new function or both

//Lecture 4: Functions Accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase(); //converts string with spaces into one word without space using regular expression with 'g' flag
};

const upperFirstWord = function (str) {
  //REST
  const [first, ...others] = str.split(' ');
  //SPREAD Operator
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher Order functions - operates at higher level of abstraction - transformer fn doesnt care how the str is transformed but just transforms the str with passed in fn
const transformer = function (str, fn) {
  //delegates string transformation to other lower order functions
  console.log(`Transformed string: ${fn(str)}`);
  //function also has properties
  console.log(`Transformed by : ${fn.name}`);
};

transformer('JavaScript is the best', upperFirstWord); //transform string with the passed in function - passing just the function value
transformer('JavaScript is the best', oneWord); //callback functions are later called by the transformer function

//JS uses callbacks in many in built functions too - callback fn helps to create level of abstraction - hide the implementation of core implementation
const high5 = function () {
  //Only when clicked this function is called
  console.log(`Clicked : 😎`);
};
document.body.addEventListener('click', high5); //callback fn is called as event handler or event listener which is called when a click event takes place

['Holly', 'Daisy', 'Poppy'].forEach(high5); // callback fn is called for each of the elements in the array

//Lecture 5: Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); //greeterHey is assigned with a function
greeterHey('Daisy');
greeterHey('Poppy');

//dir(ectly call both functions
greet('Hello')('Naany');

//using arrow functions
const greetArrow = greeting => name => console.log(`${greeting} ${name}`); //one arrow function returning another arrow function
greetArrow('Hi')('Plum');

//Lecture 6: The call and apply methods
//airline object
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){} -- but with enhanced object literal
  book(flightNumber, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNumber}`, name });
  },
};
lufthansa.book(239, 'Nanny Plum');
lufthansa.book(635, 'Red Bread');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //function value is assigned to a new variable

//In regular function call, this keyword is undefined - in strict mode
//book(237,'Holy Princess') --> 'this' is undefined, we should tell JS manually what the this keyword should look like (either eurowings or lufthansa)

//Functions are like objects, so they have methods too, we can see about call and apply methods
book.call(eurowings, 237, 'Holly Princess'); //call method calls the book function with the first argument pointing to the value of 'this' keyword - this method allows to set the 'this' kleyword manually - all other arguments are the arguments of the original book function itself
console.log(eurowings);

book.call(lufthansa, 239, 'Ben The Elf'); //this keyword set to lufthansa

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

//call method
book.call(swiss, 583, 'Lusi');

//Apply method - does the same function as call method but doesnt receive the list of the arguments after the 'this' keyword but takes an array
const flightData = [583, "Lusi's dad"];
book.apply(swiss, flightData); //Not used much in modern JS

//can also use 'call' to spread the array arguments
book.call(swiss, ...flightData); //explicitly defines the 'this' keyword
console.log(swiss);

//Lecture 7: bind method
//bind method creates a new function with the this keyword set to the object that is passed as the argument
const bookEW = book.bind(eurowings); //this keyword set to eurowings, this will not call the book fn, instead returns new fn
bookEW(237, 'King Thistle'); //looks like a normal fn call since this keyword is already set

//we can create one booking fn for each of the airlines which then make it simple to book tickets on each airlines
const bookLX = book.bind(swiss);

//we can even bind the arguments to the fn to be called with the same arguments
const bookEW237 = book.bind(eurowings, 237); //binding the flightNum to be used always when calling the book fn - it needs only name

//partial application is that - part of the argument of the original function is already applied or set
bookEW237('Queen Thistle');
bookEW237('Mr.Elf'); //preset 237 flightNum is used for both of these bookings

//With eventlisteners
lufthansa.planes = 300; //setting new property to track number of planes
lufthansa.buyPlane = function () {
  console.log(this); //points to the button - since this keyword in the eventhandler fn always points to the element on which the handler is attached
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //Not calling the handler function but JS will do call it on click - so make the handler fn still point to the lufthansa object itself we can use bind method - call method calls the fn so cant be used in event listeners but bind returns fn which can be used as event handlers that will be called later

//Partial application - preset parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//this keyword not used so can set it to null and rate is set to 23% - creates more specific fn based on more general fn addTax
const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value + value * 0.23;

console.log('using bind', addVAT(23));
console.log(addVAT(35)); //uses preset rate .23 - the order of arguments is important factor to consider while presetting

//Function that returns another fn
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log('Using higher order functions', addVAT2(23));
console.log(addVAT2(35));

//Lecture 8: Immediately Invoked Function Expressions (IIFE)
//Want to execute some fns immediately and only once not needing to store it some where
(function () {
  //any varible defined here is encapsulated and private cant be accessed by the global scope - this pattern is used to protect variables from accidently overridden from other parts of the program or from external scripts/library
  console.log('This will never run again');
  //const isPrivate = 23 --> cant access from outside
})(); //converted a stmt to an expression to be executed by JS - called immediately avoiding the need to be stored in memory

//Arrow Function - IIFE
(() => console.log('This will ALSO never run again'))();

//functions create scopes and also variables declared with let or const, create their own scope inside the block
{
  const isPrivate = 23;
  //var is not block scoped hence can be accessed from global scope
  var notPrivate = 25;
}
//global scope cant still access it since the variable defined with let or const is block scoped
// console.log(isPrivate);
console.log(notPrivate);

//In modern JS IIFE are not used anymore - since there is no need to create a function to create a new scope for data privacy from ES6 - we can use the let and const variables inside block - but to execute the fn only once still IIFE pattern can be used

//Lecture 9: Closures
//Closures - we dont create it manually like an array or a new function but it happens automatically in certain situations 

const secureBooking = function(){
  let passengerCount = 0;

  return function(){
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }

}

const booker = secureBooking();//after this line the secure booking execution context will be popped out of the call stack

booker();//but the inner function is still able to access the passenger count variable and increment it even though that variable env doesnt exists
booker();
booker();

//This is possible because of closures - booker fn is just a fn in global scope - env in which the fn was created is no longer active but still this fn has access to the variables that were present at the time when the fn was created

//Closures - makes a fn remember all the variables that existed at the function's birth place - Booker() has no variable env and it is simply the child scope of the global scope - so passengerCount variable is no where to be found in the scope chain

//Any fn always has access to the variable environment of the execution context in which the fn was created, so booker was created in the execution context of secure booking, so booker will get access to passengerCount variable thereby - so closure is just the variable env of secure booking attached to fn booker exactly as it was in the time and place where it was created - so the scope chain is preserved through closures - even when the scope has already destroyed

//Closure variables have priority over the scope chain, even if the passengerCount variable exists in global scope but the one in the closure will only be incremented

//Definition:

//So closure is the closed over variable environment of the execution context in which the fn was created even after that execution context is gone

//A closure gives function access to all the variables of its parent fn, even after that parent function has returned. In a way preserves scope chain by having a reference to its outer scope

//closures helps fns to make connections to variables that existed at the function's birth place - we cant access closed over variables explicitly

//But can observe the internal scopes property that is the variable env of this fn - which contains the closure 
console.dir(booker)

//Lecture 9: More example situations on CLOSURE
//Closure scenario 1:
let testVariable;

const testFunction1 = function(){
  const testNo1 = 23;
  //testVariable close over any variable env in the execution context of the parent function in which it was defined - function created and assigned to global variable
  testVariable = function(){
    console.log(testNo1*2);
  }
}

//reassigning testVariable
const testFunction2 = function(){
  const testNo2 = 73;
  //testVariable also closed over variable env in the execution context of the testFunction2, now the variable env of testFunction1 is no more available
  testVariable = function(){
    console.log(testNo2*2);
  }
}

testFunction1();//finishes its execution and moved out of the call stack
testVariable(); //closure --> will contain testNo1
//reassigning fn
testFunction2();
testVariable(); //closure --> will contain testNo2, old closure is replaced
console.dir(testVariable)

//Closure scenario 2:
//wait will be in secs --> is converted to milliseconds to be used in timers
const boardPassengers = function(n,wait){
  //usually passengers board in 3 groups and hence will divide total no of passengers/3
  const perGroup = n/3;
  //Timer fn - first is the call back fn to be called later and second argument is time in ms(1000ms = 1sec) after which the fn needs to be called
  setTimeout(function(){
    //n is the parameter from the parent fn which is available to this call back fn even after the parent fn execution gets over by closures
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers each`);
  }, wait * 1000)
  //will not wait until the execution of the callback fn is finished but continues
  console.log(`Will start boarding in ${wait} seconds`);
}

//callback function that executes after 3 sec still has closed over the variable env of the execution context of boardPassengers in which it was created - closure also includes arguments because they are just local variables in the fn
boardPassengers(180, 3)