'use strict';

console.log('Section 9 - Destructuring arrays and objects');

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  //Method - returning multiple values and destructured at source
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //pass object as a parameter to the function and it will destructure the object and use it - helpful when there are more than 1 parameter and remembering their order becomes challenging - names should match the property names, but doesnt need to follow the order in which it is defined in the obj, we can also assign default values
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your delicious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};
//first argument stored in first parameter and all remaining arguments collected into an array - can also call with one argument and remaining arguments will be an empty array - nothing to collect  (restaurant.orderPizza('Mushrooms'))
restaurant.orderPizza('Mushrooms', 'onions', 'olives', 'spinach', 'paneer');
//Passing only 1 object instead of 4 different arguments
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del, 21',
  mainIndex: 2,
  starterIndex: 2,
});
//Will take default values for the rest
restaurant.orderDelivery({ address: 'Via del, 21', starterIndex: 0 });

//Destructuring Arrays - ES 6 feature - unpacking array or object into separate variables
const arr = [2, 3, 4];
//destructuring assignment use square brackets to enclose the list of variables
const [x, y, z] = arr;
console.log(x, y, z);

//assigns the first and second categories to the variable
const [first, second] = restaurant.categories;
console.log(first, second);

//To assign the first and third element just skip the second element from assignement
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//Switching variables
[main, secondary] = [secondary, main];
console.log(main, secondary);

//Receive 2 return values from a function
const [starterDish, mainDish] = restaurant.order(2, 0);
console.log(starterDish, mainDish);

//Destructuring nested array
const nestedArray = [2, 4, [5, 6]];
// const [i, ,j] = nestedArray; --> to destructure further
// console.log(i, j);
const [i, , [j, k]] = nestedArray;
console.log(i, j, k);

//If we dont know the length of the array we can assign default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); //the third value would be undefined , similar to reading element at array position 2 that doesnt exist so we can set default value at assignment

//Destructuring Objects - we use curly braces and specify the exact name of the property to be retrieved
//order of the properties doesnt matter
const { name, openingHours, categories } = restaurant;
//This creates 3 new variables
console.log(name, openingHours, categories);
//To have different variable names other than the property names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//default value for the properties if suppose the api call didnt return any value for variable assignment in destructuring
const { menu = [], starterMenu: starters = [] } = restaurant;
//no property named menu so default value must be returned
console.log(menu, starters);

//Mutating variables
let a = 11;
let b = 99;
const obj = { a: 101, b: 23, c: 1 };
//{a, b } = obj; //wrapping into parenthesis since code block cant be assigned with an variable
({ a, b } = obj);
console.log(a, b); //overwritten variables

//Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//Spread Operator - Unpacking all the array elements at once
const originalArray = [7, 8, 9];
const badNewArray = [1, 2, 7, 8, 9]; //Manually copying all the elements of the array
//Without spread operator, having originalArray creates an array within new array

//use ... to expand an array into all of its individual elements - expand an array literal and can be used when we pass arguments into functions
const newArray = [1, 2, ...originalArray];
console.log(newArray, badNewArray); //--> one big array
//To expand the newArray use "..."
console.log(...newArray); //logs individual elements of the array
//Creating new array from mainMenu array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Spread operator takes all the elements out of the array and doesnt create new variables,we can only use it in places where we write values separated by commas that is when we pass arguments to a function or inside arrays

//Spread operator works on all of the iterables - arrays, strings, sets, maps but NOT objects
//Two use cases: Shallow copy of Arrays
const mainMenuCopy = [...restaurant.mainMenu]; //similar to Object.assign

//Join 2 arrays or more
const menuFinal = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuFinal);

//String spread operator usage
const str = 'Little Kingdom';
const letters = [...str, 'B', 'H', ' ']; //expanded the string
console.log(letters);

//cant be used within template literal
//console.log(`${...str} Ben and Holly`); --> Unepected token error, because ${} expects a value but not multiple values separated by commas

//Function that accepts multiple arguments
const ingredients = [
  'tomato',
  'cheese',
  'olives',
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];

restaurant.orderPasta(...ingredients); //ES6 syntax

//Objects are not iterable - from ES 2018
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant,
  founder: 'King Thistle',
};
console.log(newRestaurant);

//Copy of original array
const restaurantCopy = { ...restaurant }; //exactly makes the copy of the original array
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
//doesnt have a copy of the nested array, points to same object
restaurantCopy.mainMenu.push('Cos Cos');
console.log(restaurantCopy.mainMenu);
console.log(restaurant.mainMenu);

//REST pattern - collect multiple element and condense them into the array
//spread operator used on the right hand side of the assignment operator
//1) Destructuring
const testArr = [1, 2, ...[7, 8]];
//REST, pattern collects elements that are unused and wraps them into an array - it occurs to the left of the assignment operator
const [numb1, numb2, ...others] = [4, 5, 9, 7, 6, 1];
console.log(numb1, numb2, others);

//REST collects all array elements after the last variable it doesnt include any skipped elements, simply just the rest of the elements - rest pattern should be at the end of the destructuring assignment(must be the last element - and there can be only 1 rest operator in any destructuring)
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Objects - exact property name must be given, rest of the properties collected into an object by rest operator
const { sat: weekend, ...weekdays } = restaurant.openingHours;
console.log(weekend, weekdays);

//2. Functions - collect arbitary number of arguments into a function all at the same time- called as REST parameters
//can accept an array of any length and also individual arguments
const addFunc = function (...numbers) {
  //Func that can accept any number of parameters
  //console.log(numbers);REST syntax packs multiple arguments into one array
  let sum = 0;
  for (let index = 0; index < numbers.length; index++) {
    sum += numbers[index];
  }
  console.log(sum);
};
addFunc(9, 8);
addFunc(77, 6, 9);

//passing an array as an argument - use spread
const arrArgument = [23, 5, 7];
addFunc(...arrArgument); //taking all the elements of the array and spreading them - packing values and unpacked at the function parameter level using REST operator - REST used where we write variable names separated by commas and not values separated by commas
