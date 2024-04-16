//Functions
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const country1 = describeCountry("Inida", 1400, "Delhi");
const country2 = describeCountry("United Kingdom", 67, "London");
const country3 = describeCountry("Finland", 6, "Helsinki");
console.log(country1 + "\n" + country2 + "\n" + country3);

//Function Declarations and Expressions
const worldPopulation = 7900; // in millions
function percentageOfWorld1(population) {
  let percentage = (population / worldPopulation) * 100;
  return percentage;
}
let percentage1 = percentageOfWorld1(1400);
let percentage2 = percentageOfWorld1(67);
let percentage3 = percentageOfWorld1(6);
console.log("Function declarations");
console.log(
  `India's population is about ${percentage1} of the world population`
);
console.log(
  `United Kingdom's population is about ${percentage2} of the world population`
);
console.log(
  `Finland's population is about ${percentage3} of the world population`
);

console.log("Function Expressions/Anonymous Functions");
const percentageOfWorld2 = function (population) {
  return (population / worldPopulation) * 100;
};
percentage1 = percentageOfWorld2(1400);
percentage2 = percentageOfWorld2(67);
percentage3 = percentageOfWorld2(6);
console.log(
  `India's population is about ${percentage1} of the world population`
);
console.log(
  `United Kingdom's population is about ${percentage2} of the world population`
);
console.log(
  `Finland's population is about ${percentage3} of the world population`
);

console.log("Arrow Functions");
const percentageOfWorld3 = (population) => (population / worldPopulation) * 100;
percentage1 = percentageOfWorld3(1400);
percentage2 = percentageOfWorld3(67);
percentage3 = percentageOfWorld3(6);
console.log(
  `India's population is about ${percentage1} of the world population`
);
console.log(
  `United Kingdom's population is about ${percentage2} of the world population`
);
console.log(
  `Finland's population is about ${percentage3} of the world population`
);
//Functions calling other functions
const describePopulation = (country, population) =>
  `${country} has ${population} million people, which is about ${percentageOfWorld3(
    population
  )}% of the world`;
populationPercent1 = describePopulation("India", 1400);
populationPercent2 = describePopulation("United Kingdom", 67);
populationPercent3 = describePopulation("Finland", 6);
console.log(populationPercent1);
console.log(populationPercent2);
console.log(populationPercent3);

//Arrays
const populations = [1400, 67, 6, 1441];
console.log(populations.length === 4);
const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];
console.log(percentages);

//Basic Array Operations
neighbours = ["Bangladesh", "China", "Pakistan", "Nepal"];
neighbours.push("Utopia");
neighbours.pop();
if (!neighbours.includes("Germany")) {
  console.log("Probably not a central European Country");
}
neighbours[1] = "Republic of China";
console.log(neighbours);

//Introduction to Objects
const myCountry = {
  country: "India",
  capital: "Delhi",
  language: "Multilingual",
  population: 1400,
  neighbours: ["Bangladesh", "China", "Pakistan", "Nepal"],
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million ${this.language} people and ${this.neighbours.length} neighbouring countries and a capital named ${this.capital}`
    );
  },
  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? true : false;
  },
};

// console.log(
//   `${myCountry.country} has ${myCountry.population} million ${myCountry.language} people and ${myCountry.neighbours.length} neighbouring countries and a capital named ${myCountry.capital}`
// );

//Dot and Bracket Notation
// myCountry.population += 2;
myCountry["population"] -= 2;
console.log(myCountry.population);

//Object Methods
myCountry.describe();
myCountry.checkIsland();
console.log(myCountry.isIsland);

//Iteration : For loop
for (let i = 1; i <= 10; i++) {
  console.log(`Voter number ${i} is currently voting`);
}

//Looping Arrays
const percentages2 = [];
//const populations = [1400, 67, 6, 1441];
for (let i = 0; i < populations.length; i++) {
  percentages2[i] = percentageOfWorld1(populations[i]);
}
console.log(percentages2);

//Looping Backwards
const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];
for (let i = 0; i < listOfNeighbours.length; i++) {
  const neighbours = listOfNeighbours[i];
  for (let j = 0; j < neighbours.length; j++) {
    console.log(`Neighbour: ${neighbours[j]}`);
  }
}

//While loop
//const populations = [1400, 67, 6, 1441];
let counter = 0;
let percentages3 = [];
while (counter < populations.length) {
  percentages3[counter] = percentageOfWorld3(populations[counter]);
  counter++;
}
console.log(percentages3);
