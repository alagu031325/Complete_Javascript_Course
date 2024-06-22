'use strict';

//Scope chain
function calcAge(birthYear) {
  //Current Year not defined in this scope and hence js did a varibable look up in the scope chain and found in its parent scope
  const age = currentYear - birthYear;

  //Inner scope can have access to outer scope but not the other way around
  function printAge() {
    //age variable found in parent scope and birthYear parameter would just work like normal variables of a function, and firstName variable from global scope - longer look up
    let output = `${firstName}, you are ${age} years old, born in ${birthYear}`;
    console.log(output);

    //block scope
    if (birthYear >= 1981 && birthYear <= 1996) {
      var str = 'Checking for millenial';
      // This const variable cant be accessed outside of this block, because const and let variables are block scoped
      const firstName = 'Subbu'; // This is allowed because can be used only within the current scope, repeated variable names in different scopes is not a problem, Also functions can have same parameter names since that parameter only valid within that function scope
      const millenialStr = `Oh, and you're a millenial, ${firstName}`;
      console.log(millenialStr);

      //functions are also blocked scoped starting from ES6
      function addAge(age1, number) {
        const newAge = age1 + number;
        console.log(`You will be ${newAge} years old, after ${number} years`);
      }
      addAge(age, 12); //can access within the defined block
      //reassigning instead of redefining will change the value of the variables defined in the outer scope
      output = 'Outer variable value changed!!';
    }
    //manipulated the existing varible inside the child scope
    console.log(output);
    //addAge(age, 12); --> cant access within the defined function in strict mode, if strict turned off then functions in block are function scoped

    //var variables are function scoped, hence can be accessed inside the function in which it is defined.
    console.log(str);
    // console.log(millenialStr); --> block scope cant access it
  }
  printAge();

  return age;
}

//Global scope
const currentYear = 2023; // Cannot access variables before initialization, so initialized before function call
const firstName = 'Alagu';

calcAge(1992);
//In Global scope we cant access addAge or printAge() functions of function scope

//Hoisting - some types of variables accessible before they are actually declared

//Variable Hoisting

var me = 'Jonas'; //Hoisted, when tried to access before declaring returns value as "undefined"
let job = 'student'; //Hoisted, when tried to access before declaration throws ReferenceError, cannot access before initialization
const year = 1992; //throws error if accessed before declaration

//Temporal Dead Zone - starts from the beginning of the current scope until the point it is defined

//Function Hoisting

console.log(addFuncDecl(3, 7)); // can call function declaration before it was actually defined because of hoisting

//console.log(addFuncExpr(3 , 7)); // throws error since function value is stored in a const variable and follows the behaviour of variable hoisting
//console.log(addArrowFunc(3, 7));

function addFuncDecl(numb1, numb2) {
  return numb1 + numb2;
}

//If change the variable type to var, and try to access it before declaring we will get another type of error "addFuncExpr is not a function" ,var type variables are hoisted and assigned with undefined value, when we try to make a call on undefined(2,3) we get the above error
// var addFuncExpr = function (numb1, numb2) {
//   return numb1 + numb2;
// };

const addFuncExpr = function (numb1, numb2) {
  return numb1 + numb2;
};

const addArrowFunc = (numb1, numb2) => numb1 + numb2;

//Pitfall of Hoisting - example
//Delete shopping cart if number of products is zero, zero evaluates to false, falsy value
// console.log(numberOfProd); --> value is undefined, and hence evaluates to false and deletes the cart, though the number of products is 10
if (!numberOfProd) deleteShoppingCart();

//best practice is use let or const for variable declaration so variables are used only after declaration, and define functions at the top and use them after declaraion
var numberOfProd = 10;

function deleteShoppingCart() {
  console.log('All products deleted');
}

//window is the global object of javascript in the browser, besides all functions we also get a property name value pair for each var variables defined however we cant find let or const variable properties.

// Eg: we can test with window object
var x = 1;
let y = 2;

console.log(x === window.x); //True since x is created as a property of window object
console.log(y === window.y); // False, since no such property on global window object exists

//this keyword - special varible created for every execution context( for every function) - points to the owner of the function
//Value of "this" keyword is not static - the value depends on how and when the function is actually called
//For method - this keyword points to the object calling that method
//For normal function calls that are not attached to any object the this keyword is assigned with "undefined" value - only valid for strict mode, if not it will point to the global object (window) - this can create problems
//Arrow functions - dont get their own this keyword - this keyword in arrow function will simply be the "this" keyword of the surrounding/parent function.
//If function called as an event listener - then this keyword will always point to the DOM element that the handler function is attached to.

//this will never point to the function in which we are using it and it will never point to the variable environment of that function

//this keyword in action
//console.log(this); //this keyword in global scope is simply the window object

const regularFunc = function () {
  console.log(this); //for regular functions this keyword is not mapped to any objects(undefined) in strict mode, if not strict enabled then it points to window object
};
regularFunc(); //Function not attached any object

const arrowFunc = () => console.log(this); //arrow functions doesnt get its own this keyword, it uses the this keyword of its parent scope(here it is global scope)

const holly = {
  firstName: 'Holly',
  year: 1992,
  funcMethod: function () {
    console.log(this);
    console.log(`Your age is ${currentYear - this.year}`); //this maps to object calling the method

    //preserving this keyword, self or that - Solution 1
    const self = this;
    //function defined inside the method
    const isMillenial = function () {
      //this keyword is undefined in regular function call
      //   console.log(this.year >= 1981 && this.year <= 1996);
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    //Solution 2
    const isMillenialArrow = () =>
      //uses this keyword of parent scope (funcMethod)
      console.log(this.year >= 1981 && this.year <= 1996);
    //isMillenial();
    isMillenialArrow();
  },
  //arrow function doesn't get its own this keyword, it will use the this keyword of the parent scope(global scope) - window.firstName doesnt exist so we dont get a error but we get a value "undefined"
  greet: () => console.log(`Hey ${this.firstName}, Welcome back!!`),
  //but with var it creates property on window object that can lead to problems
};
//"alagu" object calling the method
holly.funcMethod();

holly.greet();

const ben = {
  year: 1982,
};
//method borrowing from another object
ben.funcMethod = holly.funcMethod; //copy calcAge method from holly to ben
ben.funcMethod(); //now this points to the ben object

const func = holly.funcMethod;
//func();//this keyword of regular function is undefined and cant read properties of undefined such as year

//Regular Functions vs Arrow functions
//As a best practice dont use arrow functions as methods since they dont have their own this keyword - use normal function expressions - as demonstrated in funcMethod example

//Function inside of a method - demonstated in funcMethod example -

//this keyword inside regular functions calls is undefined hence functions defined inside method dont map the object calling the method to its "this" keyword - we can assign this to self variable or more modern solution is to use arrow functions inside the object methods.

//Arguments keyword - function in addition to "this" keyword gets access to "arguments" keyword - but only available to regular functions and function expressions

const regularFuncArguments = function (a, b) {
  //a and b are parameters
  console.log(arguments);
  console.log(a + b);
};
regularFuncArguments(5, 7); //2 number of arguments or displays the number of arguments

//completely legal to add more arguments than the number of parameters
regularFuncArguments(5, 7, 1, 5); //they dont have variable name but they exists in arguments array

//But arrow functions doesnt get this "arguments" keyword
const arrowFuncArguments = (a, b) => {
  //a and b are parameters
  //console.log(arguments); => reference error stating arguments not defined
  console.log(a + b);
};
arrowFuncArguments(3, 2);

//Difference between primitive types and Objects
//For primitive data types the const variable cant be changed but for reference type(objects), the object's property can be changed since the const object variable's value is an address that references to the heap memory location of the stored object(so in turn the variable's value remains the same). Object can be huge hence not stored in stack but stored in unlimited heap memory, where else the primitive datatypes are stored in call stack.

//Whenever we are copying the object we are just creating a new variable that points to the exact same object.

//Each primitive value will be saved into its own piece of memory in the stack, only when values are same they will refer to the same memory location else different memory location is created for different variables.
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

//Object (reference types) - reference value - no const or let for values stored in heap it is only used in stack
const nannyPlum = {
  firstName: 'Nanny',
  lastName: 'Plum',
  age: 31,
};
//value points to the same memory address in the heap - and doesnt change hence const keyword works fine --> but completely reassigning the object is not allowed since it creates a new object in the heap and the value of the variable in the stack needs to be changed, but possible with let declaration
const marriedPlum = nannyPlum;
//lastName will be changed even in the original object since new object was not created in heap rather just another variable that holds the reference to the object in the heap
marriedPlum.lastName = 'Beard';
console.log('Before Marriage: ', nannyPlum);
console.log('After Marriage: ', marriedPlum);

//Copying objects
const nannyPlum2 = {
  firstName: 'Nanny',
  lastName: 'Plum',
  age: 31,
  family: ['Holly', 'King Thistle', 'Queen Thistle'], //object
};
//assign method merge two objects and return an entirely new one
//Works only at first level and doesnt work if objects are nested (Only creates a shallow copy which copies the properties at first level and not a deep copy/clone)
const nannyPlumCopy = Object.assign({}, nannyPlum2); //all properties are copied and can be stored in new object
nannyPlumCopy.lastName = 'Davis';
//Now manipulating the object within the copied object - Now both object have family with 4 members - family object is a nested object so object.assign didnt really copy it to the new object - both the objects have a property called family pointing to the same object in the memory heap - so deep clone is needed
nannyPlumCopy.family.push('Wise Old Elf');

console.log('Before Marriage: ', nannyPlum2);
console.log('After Marriage: ', nannyPlumCopy); //all properties copied from one object to another so the original object remains the same even after changing the lastName
