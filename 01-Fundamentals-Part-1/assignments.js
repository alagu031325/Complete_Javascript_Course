//Values and Varibles
const myCountry = "India";
const myContinent = "Asia";
//Population in Million
//1 Billion = 1000 Million )
let populationOfIndia = 1400;

console.log(
  "I live in " +
    myCountry +
    " which is a part of " +
    myContinent +
    " Continent" +
    " with " +
    populationOfIndia +
    " million population"
);

//Data types
const isIsland = false;
let language;

console.log(
  typeof isIsland,
  typeof language,
  typeof populationOfIndia,
  typeof myCountry,
  typeof myContinent
);

//let, const, var
language = "tamil";

//Basic Operators
let spiltPopulation = populationOfIndia / 2;
populationOfIndia++;
console.log(populationOfIndia, spiltPopulation);

let finlandPopulation = 6;
console.log(populationOfIndia > finlandPopulation);
let avgPopulation = 33;
console.log(populationOfIndia < avgPopulation);
let descriptionOfMyCountry = `${myCountry} is in ${myContinent}, and its ${populationOfIndia} million people speak different languages`;
console.log(descriptionOfMyCountry);

//Strings and template literals
descriptionOfMyCountry = `India is in ${myContinent} and its ${populationOfIndia} million people speak different languages`;

//if-else stmts
if (Number(populationOfIndia) > 33) {
  console.log("India's population is above average");
} else {
  console.log(
    `India's population is ${33 - populationOfIndia} million below average`
  );
}

//Type conversion
console.log("9" - "5"); //-->4
console.log("19" - "13" + "17"); //-->617
console.log("19" - "13" + 17); //-->23
console.log("123" < 57); //-->false
console.log(5 + 6 + "4" + 9 - 4 - 2); //-->1143

//Equality operator
// const numberOfNeighbours = Number(
//   prompt("How many neighbour countries does your country have?")
// );
// if (numberOfNeighbours === 1) console.log("Only 1 border country!!");
// else if (numberOfNeighbours > 1) console.log("More than 1 border countries!");
// else console.log("No borders:(");

//Logical Operators

if (language === "English" && !isIsland && populationOfIndia < 50) {
  console.log("You should live in India");
} else {
  console.log("India does not meet your criteria:(");
}

//Switch statement
language = "english";
switch (language) {
  case "tamil":
    console.log("This is my native language:)");
    break;
  case "chinese":
  case "mandarin":
    console.log("Most number of native speakers!");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("fourth place");
    break;
  case "arabic":
    console.log("Fifth most spoken language");
    break;
  default:
    console.log("Great Language too:)");
}

//Ternary Operator
populationOfIndia = 13;
console.log(
  `${myCountry}'s population is ${
    populationOfIndia > 33 ? "above" : "below"
  } average`
);
