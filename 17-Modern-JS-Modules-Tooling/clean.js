//Immutability 
//Making data transformations like map, filter and reduce
//Avoiding side effects
'strict mode'

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]); //still we can change the value property inside the object so we need to use external libraries for deepFreeze


//To make objects immutable - Object.freeze only freeze the first level of object it is not so called deepFreeze - 
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
//Object not extensible error
// spendingLimits.jay = 200;

//DRY PRiniple
const getLimit = (user,limits) => {
  return limits[user] ? limits[user] : 0
};

//Pure fn no longer mutates external variables
const addExpense = function (state, limits, value, description, user='jonas') {
  //use default parameters
  //if (!user) user = 'jonas';
  //Avoid data mutations
  const cleanUser = user.toLowerCase();

  // let lim;
  //use ternary operator where ever possible
  /* if (spendingLimits[user]) {
    lim = spendingLimits[user];
  } else {
    lim = 0;
  } */

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  //or even by using optional chaining or nullish operators
  // const lim = spendingLimits?.[user] ?? 0;

  // const limit = getLimit(user);

  if (value <= getLimit(cleanUser,limits)) {
    //create new array based on state and return
    return [...state, { value: -value, description, user :cleanUser}]
    //using enhanced object literal, no need to specify property name if both the value and property names are the same
    //budget.push({ value: -value, description, user :cleanUser});//Has a side effect - something outside of the fn is mutated and does something other than just returning the value
  }
  //if conditions is not met returns the original budget
  return state;

  //can also do with ternary operator instead of above if
  // return value <= getLimit(user) ? [...state, { value: -value, description, user :cleanUser}] : state;

};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

const checkExpenses = function (state, limits) {
  //impure fn since it manipulates budget and adds a new flag property
  /* for (const entry of budget) 
     let lim;
    if (spendingLimits[entry.user]) {
      lim = spendingLimits[entry.user];
    } else {
      lim = 0;
    } 

    // const lim = getLimit(entry.user);

    if (entry.value < -getLimit(entry.user)) 
      entry.flag = 'limit'; */

    //pure fn - returns new array 
    return state.map(entry => {
      return entry.value < -getLimit(entry.user,limits) ? {...entry,flag: 'limit'}:entry;
    })
};
const finalBudget = checkExpenses(newBudget3,spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  /* let output = '';
  for (const entry of budget) 
    output += entry.value <= -bigLimit?`${entry.description.slice(-2)} / `:'';

     if (entry.value <= -bigLimit) {
      output += `${entry.description.slice(-2)} / `; // Emojis count as 2 chars
    } 
  
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output); */

  const bigexpenses = state.filter(entry => entry.value < -bigLimit).map(entry => 
    entry.description.slice(-2)).join('/');

    //we can also use reduce to make the filtered values to one value
    // const bigexpensesReduce = state.filter(entry => entry.value < -bigLimit)
    //   .reduce((str,cur) => `${str} ${cur.description.slice(-2)}`,'');
  
    console.log(bigexpenses);
};
// console.log(budget);
logBigExpenses(finalBudget,500);