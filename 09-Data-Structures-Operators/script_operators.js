'use strict';

console.log('Section 9 - Modern Operators');

const weekdays = ['mon', 'tues', 'wed', 'thrus', 'fri', 'sat', 'sun'];

const openingHours = {
  //Instead of writing manually we can use square brackets synatx
  // thu: {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  // fri: {
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // sat: {
  // can even compute property name using template literals [`Day - ${2+4}`]
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

//Data copied from previous script
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //openingHours: openingHours, [property name same as variable name which is repeated]
  //ES 6 - enhanced object literal just variable name of object is enough, it will create a property with same name under the restaurant object assign the values
  openingHours,

  //Method - returning multiple values and destructured at source - ES 6 we can remove the ":" and "function" keyword
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //pass object as a parameter to the function and it will destructure the object and use it - helpful when there are more than 1 parameter and remembering their order becomes challenging - names should match the property names, but doesnt need to follow the order in which it is defined in the obj, we can also assign default values
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your delicious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}`
    );
  },
  //orderPizza will be the property name
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

console.log('----------OR-----------');

//Result of logical operators doesnt need to be boolean - logical operators are used to combine boolean values, but can be used for ANY data types, they can return ANY data type and they do short-circuiting
console.log(3 || 'Holly'); //If first value/operand is a thruthy value then it will return the first value - the other operand will not be evaluated
console.log('' || 'Ben'); //first operand is falsy value so second operand will be evaluated and return the thruthy value
console.log(true || 0); //first thruthy value will be returned
console.log(undefined || null); //both are falsy value so the second operand value will be returned

//First thruthy value will be returned - other operands will not be evaluated
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

//To check if a property exists in the object - instead of using ternary operator we can use short circuiting with || operator
let noOfGuests = restaurant.numGuests ? restaurant.numGuests : 12;
console.log(noOfGuests); //Doesnt exist so 12 returned

//default values can be set with || operator
// restaurant.numGuests = 23; //--> if the value is 0 then both these methods will not work, instead of returning 0, default value will be returned
noOfGuests = restaurant.numGuests || 10; //first thruthy value returned
console.log(noOfGuests);

//Similarly && operator also has short circuiting feature
console.log('----------AND-----------');
//&& operator short circuits when the first value is falsy and immediately returns without even evaluating the second operand
console.log(0 && 'Ben');
console.log(7 && 'Holly'); //If all the values are thruthy the evaluation continues and simply the last value is returned
console.log('Hello' && 23 && null && 'Ben'); //evaluation stops when it encounters the first falsy value and short circuits the rest of the evaluation

//Example
if (restaurant.orderPizza) restaurant.orderPizza('Panner', 'Olives');

//if restaurant.orderPizza doesnt exist (undefined) then && will short circuit the evaluation and return
restaurant.orderPizza &&
  restaurant.orderPizza('Mushrooms ', 'onions', 'tomatoes'); //function exists so function gets called with arguments

//Summary
//OR - will return the first thruthy value or simply the last value if all of them are falsy value - can used to set default values
//AND - will return the first falsy value or simply the last thruthy value if all of them are thruthy - used to call functions if it exists

console.log('--------Nullish Coalescing Operator-----------'); //ES 2020
restaurant.numGuests = 0;
noOfGuests = restaurant.numGuests || 10; //first thruthy value returned
console.log(noOfGuests); //will be assigned with 10, since 0 is falsy value but that shouldnt happen

//Nullish values are null and undefined (NOT 0 or '') - Only if the first operand is null then the second operand will be executed and returned
//If the first operand is thruthy value, they evaluation is short circuited and immediately the first non nullish value is returned(here it is 0)
const noOfGuestCorrect = restaurant.numGuests ?? 10; //if it doesnt exist then we get the default value - this nullish operator works with nullish values instead of falsy values
console.log(noOfGuestCorrect);

//ES 2021
console.log('--------Logical Assignment Operators-----------');

//2 simple objects
const restaurantObj1 = {
  name: 'A2B',
  numOfGuests: 51,
  roomsAvailable: 0,
};

const restaurantObj2 = {
  name: 'Kfc',
  owner: 'Colonel Sanders',
};

//OR assignment Operator, assigns value if the left hand operand is falsy value
//To assign default values use "||"
//restaurantObj1.numOfGuests = restaurantObj1.numOfGuests || 15;
restaurantObj1.numOfGuests ||= 15;
//restaurantObj2.numOfGuests = restaurantObj2.numOfGuests || 15;
restaurantObj2.numOfGuests ||= 15;

// console.log(restaurantObj1);
// console.log(restaurantObj2); //takes default value since the property is undefined

//Nullish assignment operator (considers 0 and empty string to be a truthy value)
restaurantObj1.roomsAvailable ??= 15;
restaurantObj2.roomsAvailable ??= 15; //if left hand operand is nullish(null or  undefined) value then assigns the default value to the property

//logical && assignment operator - assign values for properties that already exists

//restaurantObj1.owner = restaurantObj1.owner && '<ANONYMOUS>'; --> the owner will be set to undefined but it will not happen with && assignment operator
restaurantObj1.owner &&= '<ANONYMOUS>'; //first operand is falsy and hence the second operand was not evaluated, nothing assigned

//restaurantObj2.owner = restaurantObj2.owner && '<ANONYMOUS>';
restaurantObj2.owner &&= '<ANONYMOUS>';

console.log(restaurantObj1);
console.log(restaurantObj2);

//for of loop
// Automatically loop over the entire array and in each iteration it will give access to the current array element which we can specify

const combinedMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
//We can still use continue and break statements
for (const item of combinedMenu) console.log(item);

//to retrieve current index is bit tricky- originally for of loop meant to give current element
for (const item of combinedMenu.entries()) {
  //entries list of array each array have the element and the index of that element in the original array
  console.log(`${item[0] + 1} : ${item[1]}`);
} //old school way - manually retriving elements from the array - instead use destructuring of arrays directly

// for (const [i, element] of combinedMenu.entries()) {
//   console.log(`${i + 1} : ${element}`);
// }

//Enhanced Object Literals - ES 6 - 3 new ways
// 1st way - Look line 28

// 2nd way - we no longer need to create a property and assign that to a function expression to create methods in that object - look updated methods above

//3rd way - compute property names instead of writing them manually - Look line 20

//Optional Chaining (?.) - ES 2020
//We cant be sure if the restaurants that are returned from a web API is open on mondays or not - so first we need to check whether openingHours property is associated with that particulat restaurant and then check for mon property - this can grow if we have many deeply nested objects with lots of optional properties
/*
  if(restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open); //if mon property exists then retrieve the open property value
*/
//Optional chainging - if a certain property doesnt exists, js returns undefined, which can avaoid Typeerror that occurs when accessing properties that doesnt exists
console.log(restaurant.openingHours.mon?.open); //Only if mon property exists then open property value is read from it else returns undefined immediately
//We can have multiple optional chaingings
console.log(restaurant.openingHours?.mon?.open); //If restaurant doesnt have openingHours property it will return undefined, mon property would not be even read

for (const day of weekdays) {
  //if we want to use the variable name as property name then we need to use the bracket notation
  const open = restaurant.openingHours[day]?.open ?? '--'; //optional chaining and nullish operator together ES 2020 features - both relay on nullish values that is null and undefined
  console.log(`On ${day}, we are open at ${open}`);
}

// Optional chaining with calling methods
console.log(restaurant.order?.(0, 1) ?? 'Method doesnt exist'); // will check if order method exists else returns undefined instead of calling the method - then nullish operator replaces the nullish value with default value
console.log(restaurant.orderBroccoli?.(0, 1) ?? 'Method doesnt exist');

//Optional chaining even works on arrays
const users = [{ name: 'Nanny Plum', email: 'nanny@gmail.com' }];
//const users = [];
console.log(users[0]?.name ?? 'User array empty'); //If users[0] exists then retrieves the name property value else returns undefined

//In traditional way we may need to use if else - increases line of code than using optional chaining operator
/* if (users.length > 0) console.log(users[0].name);
else console.log('user array is empty'); */

//Looping objects that are not iterables
//Looping property names / keys - Object.keys returns iterable[array] holding the keys of the object that is passed in
const properties = Object.keys(openingHours);
console.log(properties);

//console.log(`The restaurant is open for ${properties.length} days`);
let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//Looping property values
const values = Object.values(openingHours);
console.log(values);

for (const { open, close } of values) {
  console.log(`We are open by ${open} and closed by ${close}`);
}

//Loop over entire object
const entries = Object.entries(openingHours);
console.log(entries); //conatins list of arrays each array having 2 elements, key and its value, but entries method accessed on array we get array with 2 elements namely the index of the element and the element itself

//Array and object destructuring
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
