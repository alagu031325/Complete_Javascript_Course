/* Challenge 1:
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  //aggregates the incoming arguments into an single array
  printGoals: function (...players) {
    //unpacks the parameters and displays it
    console.log('List of players who scored goals', ...players);
    console.log('Total number of goals scored', players.length);
    //console.log(`${players.length} goals were scored`);
  },
};

// 1: One player array for each team
const {
  players: [players1, players2],
} = game;

//const [players1, players2] = game.players

console.log(players1, players2);

// 2. create one variable for goalkeeper and an array for rest - REST

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3. allPlayers array - SPREAD operator

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4. array with substitute players

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5. create odd variable - Nested destructuring

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//6. add printGoals function

game.printGoals('Davies', 'Muller', 'Lewandowski', 'kimmich');
game.printGoals(...game.scored);

//7.Print team more likely to win - team with lower odd
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

/* Challenge 2: */

//1. Loop game.scored array and print
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

//2. Use loop to calculate odd
// const oddValues = Object.values(game.odds);
let totalOdd = 0;
let oddValues = Object.values(game.odds);
for (const value of oddValues) {
  totalOdd += value;
}
console.log(`The average of all odds is ${totalOdd / oddValues.length}`);

//Print 3 odds to the console
for (const [teamName, oddValue] of Object.entries(game.odds)) {
  //console.log(teamName, oddValue);
  //const teamStr = teamName === 'x'?'draw':`victory ${game[teamName]}`
  console.log(`Odd of ${game[teamName] ?? 'draw'} : ${oddValue}`);
}

//Create an object called 'scorers' which contains with name of the player as property and number of goals as value
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1); //ternary operator
}
console.log(scorers);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. create distinct events array - to convert set to array use SPREAD
const events = [...new Set(gameEvents.values())];
/* for (const value of gameEvents.values) {
  events.add(value);
} */
console.log(events);

//2. remove unfair event from map
gameEvents.delete(64);
console.log(gameEvents);

//3.
//to get the last value - we can use pop method , it deletes and returns the deleted element
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

//4. Loop through the Map
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[ ${half} HALF] ${min}: ${event}`);
}

///////////////////////////////////////
// Coding Challenge #4

//1.underscore_case to camelCase

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for (let item of rows) {
    item = item.toLowerCase().trim();
    console.log(changeCase(item));
  }
});

const changeCase = function (variableName) {
  const words = variableName.split('_');
  const camelCaseWords = [];
  for (const [index, word] of words.entries()) {
    index === 0
      ? camelCaseWords.push(word)
      : camelCaseWords.push(word.replace(word[0], word[0].toUpperCase()));
  }
  let camelCaseVariable = camelCaseWords.join(''); //default join str is ','
  //to make all strings of equal length - pad with empty spaces
  camelCaseVariable = `${camelCaseVariable.padEnd(20, ' ')} ${'👍'.repeat(2)}`; //to pad with empty string we can also skip the second argument
  return camelCaseVariable;
};

//String methods practice - CHallenge 5
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

//ES 2021 - replaceAll method which replaces all occurrences of the element

const getCode = str => str.slice(0, 3).toUpperCase();

for (const entry of flights.split('+')) {
  const [type, from, to, time] = entry.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`;
  console.log(output.padStart(53, '-')); //makes sure that the string has exactly this length if doesnt adds default blank spaces at the start
}
