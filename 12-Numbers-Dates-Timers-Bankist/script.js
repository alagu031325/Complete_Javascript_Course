'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-05-08T14:11:59.604Z',
    '2023-11-09T17:01:17.194Z',
    '2023-11-12T23:36:17.929Z',
    '2023-11-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-09-10T14:43:26.374Z',
    '2023-10-25T18:49:59.371Z',
    '2023-10-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    /* const day = `${date.getDate()}`.padStart(2,0);
  //pad to 2 digits in the beginning with zero - convert it to string
    const month = `${date.getMonth()+1}`.padStart(2,0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; */
    return new Intl.DateTimeFormat(locale).format(date); //all we need is only date so no options needed
  }
};

//function less dependent on the underlying application - reusable function to return value formatted for that locale and currency type
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  //need date object to use the usual methods to retrieve month and the year

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //retrieve date with index from dates array

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    //currency is different from locale
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //const formattedMov = formatCurrency(acc.balance, acc.locale,acc.currency);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer; //we need the timer to persist between different logins

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create and display current date
    const currentDate = new Date();
    //labelDate.textContent = currentDate; - not formatted

    //day/month/year => format
    /* const day = `${currentDate.getDate()}`.padStart(2,0);
    //pad to 2 digits in the beginning with zero - convert it to string
    const month = `${currentDate.getMonth()}`.padStart(2,0);
    const year = currentDate.getFullYear();
    const hours = `${currentDate.getHours()}`.padStart(2,0);
    const min = `${currentDate.getMinutes()}`.padStart(2,0);
    labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`; */

    //using Internationalization API
    //can also use en-GB, ar-SY, iso language code table
    //options argument - configuration object to display both time and date
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //if we specify 'long' - name of month like january will be printed - also has another option '2-digit' that displays 8 as 08 or numeric
      year: 'numeric', //can also specify '2-digit'
      //weekday: 'short', //can also say 'long' or 'narrow'
    };

    //Instead of getting locale manually we can get it from the user's browser
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(currentDate);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //if already timer exists clear it
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date - date for corresponding movements
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //reset timer - timer cleared and new timer is started again after doing a transfer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  //To round any value down we can use floor method, no need to convert string to number because Math.floor does type coersion
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      //reset timer
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000); //Loan approved after some time
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURE 1: Converting and Checking numbers

//All numbers are internally represented as decimals
console.log(23 === 23.0);

//Numbers are internally represented in base 2 format - 0 and 1s
//Base 10 is 0 to 9 - so certain fractions are difficult to represent in base 2
console.log(0.1 + 0.2 === 0.3); //is false because JS represents fractions also in base 2, so has trailing numbers which makes comparison to be false - so cant make accurate financial calculations

//Convert string to Numbers
console.log(Number('23'));
//mentioning a positive number
console.log('Unary + operator', +'23'); //JS does type cohersion - when it sees + it converts string to numbers
//When we use unary + operator in front of a string, JS wil try to convert it to a number but if it is not successful then it results in NaN
const num1 = +'ae';
//num 1 is NaN
console.log('typeof operator', typeof num1, num1);

//Parsing numbers from string values - particularly coming from CSS
console.log('ParseInt', Number.parseInt('30px', 10)); //It can contain some symbols - then JS figures out the number in this string - but the string must start with a number otherwise JS cant parse and will return NaN
console.log('NaN from parseInt', Number.parseInt('aei23', 10));

//ParseInt can accept radix as its second argument - normally base 10

//ParseFloat - reads decimal number from the string
console.log('parseFloat', Number.parseFloat('   2.5rem'));
console.log('parseInt doesnt return decimal part', Number.parseInt('2.5rem'));

//Number namespace has parseInt, parseFloat and isNaN function - Only used to check if a value is "NaN"
console.log(Number.isNaN('20')); //is a value
console.log(Number.isNaN(20)); //is a number
console.log('Is NaN', Number.isNaN(+'ae10'));
console.log(Number.isNaN(23 / 0)); //diving by 0 gives Infinity so not a NaN

//To check if a value is a Number not a string - we can use isFinite - mainly for floating point numbers
console.log(Number.isFinite(23 / 0)); //infinity is not finite
console.log(Number.isFinite('23')); //Not a number
console.log('isFinite', Number.isFinite(23)); //Finite and a number
console.log(Number.isFinite(+'ae10')); //not a number as well
//To check for integer numbers
console.log('isInteger', Number.isInteger(23));
console.log('isInteger', Number.isInteger(23.0)); //23.0 is also an interger
console.log('isInteger', Number.isInteger(23 / 0)); //infinity

// LECTURE 2: Math and Rounding
//Square root
console.log('Math.squareroot', Math.sqrt(25));
//Exponential Operator - can achieve the same sqrt functionality
console.log('squareroot using exponenetial', 25 ** (1 / 2));
console.log('cuberoot using exponenetial', 8 ** (1 / 3)); //Way to calculate the cubic root

//Max function
console.log('max function', Math.max(5, 18, 23, 11, 2));
//max function does type coersion - so should convert any string to number
console.log('max - type cohersion', Math.max(5, 18, '23', 11, 2));
//But it doesnt parse any extra characters like units
console.log('max - no parsing', Math.max(5, 18, '23px', 11, 2)); //returns NaN

//Min function
console.log('min function', Math.min(5, 18, 2, 11, 2));

//constants are also on the MATH namespace
//To calculate area of circle - PI * r * r
console.log(Math.PI * Number.parseFloat('10px') ** 2);

//Math random function
console.log(Math.random()); //number between 0 and 1
//To get values from 1 to 6
console.log(Math.trunc(Math.random() * 6) + 1); //highest number will be 5 if 1 not been added

//To generate random integers between two values
const randomInt = (min, max) => {
  /* const randomNo = Math.random();
  console.log("random number",randomNo);
  const multiplier = max - min;
  console.log("multiplier", multiplier);
  const randomMultiplied = randomNo * multiplier + 1;
  console.log("random multiplied",randomMultiplied);
  const randomInt = randomMultiplied +min;
  console.log("random int",randomInt);
  return Math.trunc(randomInt); */
  // return Math.trunc(Math.random()*(max-(min-1)))+min; //10 to 20
  // return Math.trunc(Math.random()*(max-min)+1)+min //11 to 20 only
  return Math.floor(Math.random() * (max - min + 1)) + min; //10 to 20 only
};
// random is btn 0 and 1 -> multiply with max - min then we get number btn 0 and max - min,  --> add min to both sides --> min ... (max-min)+min --> min .... max
console.log('int between 10 and 20', randomInt(10, 20));
console.log('int between 1 and 6', randomInt(1, 6));

//Rounding integers
console.log('trunc removes decimal', Math.trunc(23.33));
//To round to nearest integer use Math.round
console.log('Math.round', Math.round(23.5)); //24
console.log('Math.round', Math.round(23.1)); //23
console.log('Math.round', Math.round(23.9)); //24

console.log('Math.ceil', Math.ceil(23.1)); //24 -> rounded up to highest value
console.log('Math.ceil', Math.ceil(23.9)); //24

console.log('Math.round', Math.floor(23.8)); //23 -> rounded down to lowest value
console.log('Math.round', Math.floor(23.3)); //23
//all of these methods can also do type coersion
console.log('Math.round type coersion', Math.floor('23.3')); //23

//floor and trunc behave the same for positive numbers
//but for negative numbers they dont work the same way
console.log('Math.floor - neg no', Math.floor(-23.3)); //rounded down to -24 since -24 < -23 - works for both positive and negative numbers
console.log('Math.trunc - neg no', Math.trunc(-23.3)); //-23

//Rounding Floating point numbers or decimals - number primitive type dont have methods so converts to Number object (boxing) and call method on that object and converts back to primitive
console.log('rounded decimal value', (2.7).toFixed(0)); //toFixed always return a string
console.log('adds decimal parts ', (2.7).toFixed(3)); //toFixed adds 3 decimal parts
console.log('removes decimal parts ', (2.345).toFixed(2)); //toFixed returns 2 decimals 2.35
console.log('unary operator returns number', +(2.345).toFixed(2)); //toFixed string to Number

// LECTURE 3: Remainder Operator - returns remainder of a division operator
console.log('remainder of 5/2', 5 % 2); //returns 1
console.log('remainder of 8/3', 8 % 3); //returns 2 ( 8 = 2*3 + 2)

//To check even or odd : Is even if divisible by 2 so remainder will be 0
console.log('odd number', 7 % 2);
console.log('even number', 6 % 2); //remainder is 0

//Function to check for even - returns boolean
const isEven = n => n % 2 === 0;
console.log(isEven(234)); //true
console.log(isEven(23));
console.log(isEven(51));

//Usecase
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // 0,2,4,6
    if (i % 2 === 0) row.style.backgroundColor = 'cyan';
    // 0 ,3,6,9 -> first number should be exactly divisible by the second
    //if(i%3 === 0)
    // row.style.backgroundColor = 'blue'; -> colors every 3rd row and we can use remainder operator to do something every nth time
  });
});

// LECTURE 4: Numeric Separators - are simply the underscores that we can place anywhere between the numbers and will make it easy to understand large numbers
//diameter of our solar system
const diameter = 287_460_000_000;
//JS Engine ignores the underscores
console.log('diameter of solar system', diameter);

const price = 345_99;
console.log(price);

//Both denotes the same number but the underscore may be used to convey different meaning
const transferFee1 = 15_00;
const transferFee2 = 1_500;

//PI - cant have 2 underscores in a row or cant have it in the beginning or at the end, can be only between numbers
const PI = 3.14_15;
console.log('PI value', PI);

//When we try to convert strings to Numbers with underscores - it might not work as expected
console.log(Number('234_56')); //returns NaN, since numeric separators should be used only between numbers
//Similarly we cant parse strings with underscores correctly
console.log(parseInt('230_000')); //only 230 returned not integers after the underscore

// LECTURE 5: Working with BIGINT
//In 64 bit used to store number 53 bits are used for numbers and rest for decimal points
console.log('biggest number that JS can safely represent', 2 ** 53 - 1); //since number starts from 0 - 2 because it is base 2 representation

//same as stored in Math namespace
console.log(Number.MAX_SAFE_INTEGER); //precision or correctness lost for number greater than this

//ES 2020 - BIGINT - to represent bigger numbers
//n transforms a regular number to a big int number
console.log('big int representation', 4589099876563778582222285959595n);

//BigInt constructor fn if used with big numbers then again JS cant represent them precisely because it still internally represents them as Number before it converts to BigInt
console.log(BigInt(458909987656377)); //so only 2 ** 53 numbers can be used with BigInt

//Operations - all operators work the same
console.log('Multiplication', 4589099876563778582222285959595n * 10000000000n);

//But mixing big int with regular numbers is not possible so we use BigInt constructor to change Number to BigInt
console.log(4589099876563778582222285959595n * BigInt(20));

//Exception 1
console.log('<,> works with mixed types', 20n > 13);
console.log('=== doesnt work', 20n === 20); //JS doesnt do type coersion when we use strict equality operator

//Math operators doesnt work on BIG INT

//but with equality operator it works as JS does type coersion
console.log('bigint converted to number', 20n == 20);

//String concatenations also allow combination of types - exception 2
console.log(
  'concat big int',
  45890998765637712345678777n + ' is REALLY BIG!!!'
);

//Divisions
console.log('Big int division', 10n / 3n); //cuts the decimal part of and just represents the closest big init
console.log('normal division ', 10 / 3);

// LECTURE 6: Creating dates
//Create a date
const now = new Date(); //gives current date and time
console.log(now);

//Creating dates with strings, Number, timestamps, iso dates
//pass in a string to convert to date and time notation
console.log('To date notation', new Date('Nov 1 2022 13:05'));
//can even skip year or time, the JS will add default values
console.log('default time added', new Date('December 25 2023')); //Time might be unreliable so safe to use date strings created by JS

//Z - UTC(Coordinated universal time - time without timezone in London and without day light savings)
//GMT - local mean time at the Royal Observatory Greenwich London
console.log(
  'parsing string created by JS',
  new Date(account1.movementsDates[0])
);

//month in JS is 0 so 10 - is Nov not 11th month
console.log(new Date(2037, 10, 19, 15, 23, 5));

//JS autocorrects dates to the next correct date
console.log(new Date('Feb 31 2023')); //represents as March 3rd

//can also pass milliseconds as argument to date function which tells how many ms after Jan 01 1970
console.log(new Date(1000)); //1000 ms after initial UNIX time

// 3days after that date
console.log('converts days to ms', new Date(3 * 24 * 60 * 60 * 1000)); //days*hours*min*sec*ms - timestamp of the Day

//Dates are special kind of Objects so they have their own methods - used to set or get components of the dates
const future = new Date(2037, 10, 19, 15, 23);
console.log('Future', future);
//dont use getYear, use only getFullYear to retrieve year
console.log('year from date', future.getFullYear());
console.log('get month - 0 based', future.getMonth()); //so if it is 10 then it is Nov or if it is 1 then it is Feb, 0 is Jan
//getDate returns day of the month and getDay returns day of the week
console.log('day of month', future.getDate());
console.log('day of week', future.getDay()); //0 based where 0 is the sunday
console.log('hour of the day ', future.getHours());
console.log('min of the day ', future.getMinutes());
console.log('seconds of the day ', future.getSeconds());
console.log('ISO international standard representation', future.toISOString()); //used to convert particular date to string to be stored in the variable
console.log(future.getTime()); //returns the timestamp or ms that have passed since the specified date from Jan 1st 1970

//We can change this to a Date by passing this number to the Date function which returns exactly the same time
console.log('reverse timestamp to date', new Date(2142256980000));

//to retrieve the current timestamp
console.log(Date.now());

//set versions available for all of the above methods - also performs autocorrection
future.setFullYear(2041); //modifies the future object
console.log('changed future date', future);

// LECTURE 7: Adding Dates to Bankist App

/* //FAKE LOG IN -
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100; */

// LECTURE 8: Operations with Date
//subtract one date from another n this works because the date is converted to a number that is timestamps in milliseconds
//const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); //returns value in milliseconds from UNIX time
//can also use "+future" to convert date to number

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); //returns milliseconds need to be converted to days - 24 hours, 60 min each with 60 secs each min and 1000 ms each second
console.log(calcDaysPassed(new Date(2025, 3, 15), new Date(2025, 3, 25)));

//Date library - moment.js is the date library free to use day light saving changes, timezones

// LECTURE 9: Internationalizing dates - using Browser API - to format dates and numbers
//setting to formatted date using internationalization
const currentDate = new Date();
labelDate.textContent = new Intl.DateTimeFormat('en-US').format(currentDate); //gets the locale string that contains the language and the country (english - US) - creates a formatter for english in US country - formats dates based on language and country

// LECTURE 10: Internationalizing numbers - using APIs
const number = 38823456.789;

const options = {
  style: 'unit', //can also use percent or currency
  unit: 'celsius',
  //If we have currency the unit will be ignored but we need currency property
  currency: 'EUR',
  //should define the currency manually cant be determined by the locale
  useGrouping: false, //will remove the separator between numbers
};

console.log(
  'US:      ',
  new Intl.NumberFormat('en-US', options).format(number)
);
console.log(
  'Germany: ',
  new Intl.NumberFormat('de-DE', options).format(number)
);
console.log(
  'India:   ',
  new Intl.NumberFormat('ta-IN', options).format(number)
);
//can also use the locale from navigator.language

// LECTURE 11: Timers
//setTimeout - receives a call back function - which will be executed by JS after the specified number of millisecs
setTimeout(() => console.log('Here is your Pizza 🍕'), 3000); //calls fn after 3 sec
//registers call fn and proceeds to futher execution and JS counts the time in the background
console.log('Waiting...'); //executed before the setTimeout callback fn

//No arguments can be passed since the fn is called by JS - but whatever we pass after the milliseconds, the timeout fn will consider them as the fn arguments
const ingredients = ['olives', 'spinach', 'cheese'];
const pizzaTimer = setTimeout(
  (ing1, ing2, ing3) =>
    console.log(`Here is your Pizza with ${ing1}, ${ing2} and ${ing3}🍕`),
  3000,
  ...ingredients //3rd argument is taken as 1 st arg of the callback fn
);

//We can also cancel timeout before the 3 secs
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); //provide the timername to clear the timeout(delete it)

//In setTimeout the call back fn is executed only once, what if we want our fn to be executed every 5 sec or 10sec
/* setInterval(function () {
  console.log(new Date());
}, 1000); */ //executes the fn repeatedly in 1 sec interval

// LECTURE 12: Implementing a countdown timer
//For security reasons we need to log out of current users after some time of using banking app
//Logout timer function

const startLogOutTimer = function () {
  let time = 120;
  //set the time variable to 5 min (initially t0 100 secs)
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0); //to show min and sec
    const sec = String(time % 60).padStart(2, 0);

    //show the time
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }

    //Decrease by 1s
    time--;
  };

  tick(); //calls in the beginning
  const timer = setInterval(tick, 1000); //every 1 sec(1000ms) this callback fn will be executed which displays the time

  //Goal of the timer is to track inactivity - so we need to reset each time when we do some activity - transfer/request loan

  return timer; //we may need to clear the timer of the prev user when another user login happends hence return it to the calling function
};
//This fn starts calling only after 1 sec to call it immediately and thereafter first wrap this into a new fn and call it immediately and then use the setInterval fn to call it repeatedly
