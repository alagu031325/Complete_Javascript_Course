// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const currentYear = 2023;
const calcAge = (birthYear) => currentYear - birthYear;
console.log(calcAge(1992));

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

//Task 1 - Calculating temperature amplitude
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 1; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log('max', max, 'min', min);
  return Math.abs(max) - Math.abs(min);
};
// calcTempAmplitude([35, 90, 23, 13, 8, 107]);

const amplitude = calcTempAmplitude(temperatures);
console.log('The amplitude is', amplitude);

//Task 2 - Function should now recieve two arrays - So merge the
//array into one before calling function

const t1 = [31, -23, -6, -10, 'error', 5, 90, 1102];
const t2 = [79, -71, -3, -1, 'error', 78, 99, 234, 21];

const calcTempAmplitudeRevised = function (temps1, temps2) {
  const temps = temps1.concat(temps2);
  return calcTempAmplitude(temps);
};

const amplitudeRevised = calcTempAmplitudeRevised(t1, t2);
console.log('The revised amplitude is', amplitudeRevised);

//Debugging errors
//Task 3 - Change celcius to Kelvin
const measureKelvin = function () {
  // value: prompt('Enter the temperature in Celcius'),
  const measurement = {
    type: 'temperature',
    unit: 'celcius',
    value: '25',
  };

  //Displays object in table format
  console.table(measurement);

  //Along with console.log, we can also use console.warn and console.error
  //to raise warning and error messages

  //Without Number type conversion, string concatenation happens
  //debugger - keyword opens the browser debugger, putting the breakpoint at this line
  const kelvinTemp = Number(measurement.value) + 273;
  return kelvinTemp;
};

console.log(measureKelvin());

//Task 4 - Print Forecast
let output = '';
const printForecast = function (temperatures) {
  for (let i = 0; i < temperatures.length; i++) {
    if (typeof temperatures[i] !== 'number') continue;
    output += `... ${temperatures[i]} degree celcius in ${i + 1} day `;
  }
  console.log(output + '...');
};

printForecast(t1);
