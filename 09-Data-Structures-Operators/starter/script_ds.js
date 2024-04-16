'use strict';

console.log('Section 9 - Sets and Maps datastructure');

//Sets can never have duplicates - functions used "add","delete","has"
const ordersSet = new Set(['Pasta', 'pizza', 'Dosa', 'Idly', 'Pasta', 'Dosa']); //pass an iterable
//duplicates will be automatically removed while creating Sets
console.log(ordersSet); //Sets are bunch of values grouped together and just as arrays, sets are also iterables
console.log(ordersSet.size); //number of unique different meals that will be cooked
console.log(ordersSet.has('Pizza')); //case sensitive - do match the exact item only
console.log(ordersSet.has('Bread'));
console.log(ordersSet.has('Idly')); //similar to includes method in array

ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread'); //ignored
ordersSet.delete('Pasta');
//ordersSet.clear(); //delete all of elements in the Set
console.log(ordersSet);

//Retrieve values from a Set - A set has no indexes, no way of getting values out of a set with index - To store value in order and retrieve it then we should use arrays - Sets are unique elements and no order is maintained, so all we need to know is whether a set contains a particular element or not

//Sets are also iterables so we can loop over it
for (const order of ordersSet) console.log(order);

//Elements in Sets are unique and order of elements in the Set is irrelevant
//Strings are also iterables so we can pass a string to Set function
//Set could also be empty like new Set()
const nameStr = new Set('Nanny Plum');
console.log(nameStr);
//counts the number of letters in the name
console.log(nameStr.size);

//Example - main use case is to remove duplicates from an array and store it in sets
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
console.log(new Set(staff));
//We only want to know the different positions in the restaurant
const staffUnique = [...new Set(staff)];
console.log(staffUnique); //Conversion from set to an array is pretty easy - Spread operator works on all iterables that includes Sets

//To just know how many different positions - no need to create the array at all if we dont need
console.log(new Set(staff).size);

//MAPS : Fundamentals - ES 6 - has, get, set, delete
//Maps - is a datastructure that we use to map values to the keys, Just like in objects data is stored in key/value pairs - but the big difference is that map keys can be of any type - can be objects or arrays or other maps

const restaurantMap = new Map(); //empty map
restaurantMap.set('name', 'Chettinad Mess');
restaurantMap.set(1, 'London, UK');
console.log(restaurantMap.set(2, 'Ipswich, UK')); //This set method updates and returns the map
//Can have the next set on the returned map
console.log(
  restaurantMap
    .set('categories', ['Non-vegetarian', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23) //can call any number set on the updated map returned
    .set(true, 'We are open')
    .set(false, 'We are closed')
);

//To read data from the Maps
console.log(restaurantMap.get('name')); //pass in the name of the key
console.log(restaurantMap.get(true)); //the key should match the exact data type else it will return undefined --> eg: console.log(restaurantMap.get('1'));
console.log(restaurantMap.get(1));

const time = 21; // 9PM
console.log(
  restaurantMap.get(
    time > restaurantMap.get('open') && time < restaurantMap.get('close') //returns boolean which are declared as Map keys
  )
);

//Check if Map contains certain key
console.log(restaurantMap.has('categories')); //returns true if the key exists in the Map
console.log(restaurantMap.has('1')); //returns false since it is not a nuerical 1

//delele an key value pair from the map based on the key
console.log(restaurantMap.delete(2)); //returns true if the key to be deleted exists else false
console.log(restaurantMap);

//We can delete properties from Object using delete operator but that is not recommended to do
//restaurantMap.clear(); //removes all elements from the Map
//Map size property
console.log(restaurantMap.size); //returns number of items in the Map

//Use arrays or objects as Map keys
restaurantMap.set([1, 2], 'Test array key'); //the key represents exactly this object in heap memory

//To get data based on that array
console.log(restaurantMap.get([1, 2])); // it returned undefined because these 2 arrays are different objects in the heap, so to overcome create a new array and assign it with the list of values

const arr = [1, 7, 9];
restaurantMap.set(arr, 'Modified array key');

console.log(restaurantMap.get(arr)); //These two refers to the same object in the heap memory --> this can be useful with DOM elements that are special kinds of objects

console.log(restaurantMap.set(document.querySelector('h1'), 'Heading'));

//Maps Iteration
//Set method is bit cumbersome when there are lot of values to be set
const question = new Map([
  //arrays of array to create the new Map
  ['question', 'What is the best programming language in the World?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct Answer'],
  [false, 'Try again!'],
]);

console.log(question);

//The above array structure is returned from calling Object.entries() method
//console.log(Object.entries(Object whose key,value pair to be returned));

//There is an easy way to convert object to Map
const openingHours = {
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
};

//Again array of arrays is passed
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Iterations is possible on Maps since they are also iterables
//Good use case to use destructuring - Quiz App
console.log(question.get('question'));
for (const [key, value] of question) {
  //Object is not iterable so entries are retrieved and stores in question
  if (typeof key === 'number') console.log(`Answer ${key}:${value}`);
}
const answer = 3;
//const answer = Number(prompt('Your answer'));
console.log(question.get(answer === question.get('correct')));

//Sometimes we may need to convert Map back to an array
console.log([...question]); //Spread operator unpacks the entries and creates array of arrays

//Map methods returns Map Iterator
console.log(question.entries());
console.log(question.keys()); //can also use spread to destructure the array console.log([...question.keys()]);
console.log(question.values());

//Sumamry : which DS to use
//Web API - is used to get data from other web applications
//Collection of data are stored in datastructures - 4 built in datastructures in JS
//1) Simple list of values - array or set (When we do not need to describe the values)
//2) Key value pairs - Objects or Maps (We can describe the values using the key)
//Json - can be easily converted to JS objects because it uses the same formatting
//Array - When we need ordered list of values which can contain duplicates, use array when we need manipulation of data
//Sets - Work with unique values, when high performance(searching and deleting items in set is faster than in arrays) is need and automaticallly removes duplicates
//Objects - traditional key/value datastructure - easier to write and access values with . and [] notation - use when you need to include functions as values and can use "this" keyword to access properties of the same object - use when working with json data
//Maps - better suited for simple key,value stores - offer better performance and map keys can be of any data types, easy to iterate and easy to compute size of a map
