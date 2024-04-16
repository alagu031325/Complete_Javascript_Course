'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Lecture 1 : Asynchronous Javascript, AJAX and APIs

//Synchronous code - code is executed line by line by Execution thread (which is part of the Execution context that executes the code in computer's CPU)

//Each line of code always waits for the previous line of code to finish execution - This will create prob when one line of code takes a long time to execute - Like stmts after alert are blocked, until it is resumed (Blocks execution of code)

//Asynchronous code[non blocking] - setTimeout makes the timer run in the background without blocking the execution of rest of the main code, the code inside setTimeout (call back fn code) is executed after the timer task that runs in the background finishes - so action was deffered into the future 

//Aysnchronous programming is coordinating the behavior of our code over a certain period of time - not occurring at the same time, deffered 

//callback fns in itself doesnt make the code asynchronous only certain fns such as timeout work in asynchronous way

//setting the "src" attribute of an image is actually loading an image in the background - while the rest of the code can be executed - asynchronous code - once the image is loaded, load event is emitted by the JS, and can add callback fn to be executed once the image has been loaded by using addEventListener fn. - All this code is non blocking and execution continues.

//addEventListener alone doesnt make the code asynchronous - this becomes aysnchronous because of the img load event which is being executed in background

//More examples of asynchronous code in JS - Geolocation and Ajax calls

//AJAX - Asynchronous JS and XML - allows to communicate with remote web servers in an asynchronous way. With AJAX calls we can request data from web servers dynamically (without reloading the page we can request and use the data in the application dynamically) - client (browser) and Web server communication happens asynchronously in the background, HTTP request can be of different types like GET and POST requests. Web API usually contains the data which we are requesting for.

//API - Application programming interface is a piece of software that can be used by another software to allow applications to talk to each other and exchange information. Eg: DOM API, Geolocation API are self contained pieces of software that allow other softwares to interact with them - Objects made from classes that make some methods available as public interface - are self contained encapsulated pieces of software that other pieces of software can use to interact with them

//Online API - is a application running on a web server which receives requests for data and this retrieves this data from some DB and sends it back to client as response. (Web API)

//Can build our own web API or use third party web APIs - can get data about flights/countries/send email/sms , many more

//API data formats - XML is a data format that was used widely to transmit data over internet - but no API now uses XML - it is just an old name - but JSON data format - JS object converted to a string and very easy to use in JS once the data is arrived.

//Lecture 2 : First AJAX Call - 
//Old school way of AJAX calls - XML Http functions
const renderCountry = function(data, className = ''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
    `;
    
    countriesContainer.insertAdjacentHTML('beforeend',html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function(country){
const request = new XMLHttpRequest();

//Specify the URL to which AJAX call has to be made
request.open('GET',`https://countries-api-836d.onrender.com/countries/name/${country}`);

//send the opened request
request.send(); //sent to URL - will run in the background and fetch the data without blocking the execution of the main code - emits load event once data fetching is done

//call back fn is called as soon as data arrives
request.addEventListener('load',function(){
    //"this" keyword points to request object - responseText property is set once the data has arrived - convert string to object
    // console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    // console.log(data); //destructure the array 
    //convert population value to a Number and then divide by 1M and round off to 1 decimal place
    renderCountry(data); //Render country 1

    //Get Neighbour country
    const neighbour = data.borders?.[0];

    if(!neighbour) return;

    //AJAX call 2
    const request2 = new XMLHttpRequest();

    //Specify the URL to which AJAX call has to be made
    request2.open('GET',`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);

    request2.send();
    //this call is dependent on first AJAX call because it happens in the 1st call's callback function - one call back inside another call back - Nested call backs - call back hell - to execute asynchronous tasks in sequence
    request2.addEventListener('load',function(){
        const data2 = JSON.parse(this.responseText); //country codes are unique so only one country will be returned not an array 
        
        renderCountry(data2,'neighbour');

    })

});
}

//getCountryAndNeighbour('portugal');//2 AJAX calls happening at the same time - data might arrive slightly at different times for both these calls - nonblocking behavior

/* getCountryData('usa');
getCountryData('germany'); */

// getCountryAndNeighbour('usa');

//Lecture 3 : How the web works: Requests and Responses
//Request - Response Model or Client server architecture
//Each URL has protocol, Domain name(not the real address of the server we want to access) and a Resource that we want to access

//DNS - Domain Name Server are the special kind of servers (phone books of the internet) -1) browser makes request to DNS servers and get the server's real IP address

//Port number is a sub address to identify a specific service running on the server 

//2) TCP/IP(communication protocol that defines how data travels across the web) socket connection is established between the browser and the server 

//HTTP is also a communication protocol(set of rules that allow two or more parties to communicate with each other) - 3) After TCP connection, HTTP request is sent

//HTTP method types(GET, POST, PUT/PATCH to modify data), HTTP version, request target is the start line of the HTTP request followed by HTTP request Headers and Request Body (only when sending data to the server in POST)

//HTTPS encrypted with TLS /SSL protocols

//HTTP Response - start line - status code and message - to let the client know if the request was successful or failed - and then the HTTP response header and the body which contains the JSON data coming back from the Web API

//TCP - is to break request and responses into 1000s of small chunks called packets before they are sent , once these packets arrive at the destination the TCp will reassemble all the packets into original request/response. IP protocol will send and route the packets through the internet, it ensures they arrive at the correct destination using the IP addressess on each packet.

//Lecture 4 : Callback Hell - sequence of AJAX calls so second one runs only after the first one is done
//second call we get data from first call - refer above example

//Call back hell
/* setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
        console.log('2 second passed');
        setTimeout(() => {
            console.log('3 second passed');
            setTimeout(() => {
                console.log('4 second passed');
                setTimeout(() => {
                    console.log('5 second passed'); //Triangle shape - call back hell
                },1000);
            },1000);
        },1000);
    },1000);
},1000); */

//Hard to maintain and difficult to understand, will have more bugs

//Lecture 5 : Promises and Fetch API (ES6)
//const request = fetch("https://countries-api-836d.onrender.com/countries/name/usa");
//console.log(request); //returns a promise

//Promise - placeholder/container for the future result of an asynchronous operation - they are time sensitive and will be in different state at different times

//Promise Lifecycle
//PENDING - Requent sent before future result is available 
//Settled - Asynchronous task is finished - can either be a SUCCESS(FULFILLED) or a FAILURE(REJECTED)- error happened and cant connect to the server - we should handle these different states in our code - A promise is settled only once and it is impossible to change the state - These states are when we consume a promise (the promise already returned by the Fetch API(Builds Promises))

//Advantages of using promises
//1. We no longer need events and callbacks hell to handle asynchronous results
//2. we can chain promises for a sequence of asynchronous operations instead of callback hell

//Lecture 6 : Consuming Promises
/* const getCountryData = function(country){
    //as soon as the promise is fullfilled the callback function within the then method is executed
    const request = fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(
        //JS calls with the resulting value of the fullfilled promise
        function(response){
            //to read value from body we need to call the json method (Body is a ReadableStream)
            return response.json(); //available on all response objects coming from fetch fn - json method is an asynchronous fn and it will also return a new promise - and handle it in another call back fn
        }
    ).then(function(data){ //can call then method on the returned promise
        console.log(data); //we get the api outcome data - result of previous promise
        renderCountry(data[0]);
    })
} */

//Lecture 7 : Chaining Promises

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

//cleaner version of getCountryData
/* const getCountryData = function(country){  
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    // .then((response) => response.json(), err => alert(err)) //we did catch the error
    .then((response) => {
        if(!response.ok)  //if ok property set to false
            throw new Error(`${errorMsg} (${response.status})`) //throws the error terminating the current fn - this will immediately reject the promise - so this rejection will then propagate to the catch handler 
        return response.json()
    })
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];

        if(!neighbour) return;
        
        //Neighbouring country - then method always returns a Promise no matter if we actually return anything or not, if we return a value then that value will be the fulfillment value of the promise - data that we receive in "then" function will be the fullfilled value of the promise
        return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);

        //this will introduce one call back fn inside another one
        //fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`).then(response => response.json())
    }//fulfilled value of the promise "data" is used to call the "then" method
    ).then(response => response.json()).then(data => renderCountry(data, 'neighbour'))
    .catch(err =>{ console.error(`${err} 💥💥💥`);
            renderError(`Something went wrong🔴 ${err.message}. Try Again!`);}).finally(()=>{
                //to show a spinner for loading

                //to make the container visible 
                countriesContainer.style.opacity = 1;
            }) //Handling the error at multiple places(err => alert(err)) by repeating code breaks DRY Principle - instead we should handle these errors globally in one place - by removing all callbacks and attaching a catch method at the end of the promise chain which can catch any errors that occurs at any place in the promise chain (accessing message property of err object)
} */
//Instead of call back hell we have flat chain of promises

// getCountryData('germany');

//Lecture 8 : Handling rejected promises - Errors
//When the user looses the internet connection - fetch promise gets rejected
/* btn.addEventListener('click',function(){
    getCountryData('germany');
}) */

//2 ways of handling rejected promises - pass second call back function to "then" method
//1st call back for successful promise - refer above getCountryData or can use catch to catch any errors across the promise chain

//Besides "then" and "catch" there is also "finally" method -> always be called whatever happens with the promise either success or rejection - this only works on promises, catch itself returns a promise

//getCountryData('Rindia'); //we will get weard error - doesnt reflect the exact error msg - this happens because fetch promise only rejects when their is no internet connection - but with 404 status code the fetch promise will still get fulfilled

//Lecture 9 : Throwing errors manually - refer getCountryData - It's a bad practice to leave the rejected promises unhandled

//Helper functions
const getJSON = function(url,errorMsg = 'Something went wrong'){
    return fetch(url).then((response) => {
        if(!response.ok)  //if ok property set to false
            throw new Error(`${errorMsg} (${response.status})`) //throws the error terminating the current fn - this will immediately reject the promise - so this rejection will then propagate to the catch handler 
        return response.json()
    });
};

const getCountryData = function(country){  
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`,'Country not found')
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];

        if(!neighbour) 
            throw new Error(`No neighbour found!`)
        
        return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,'Country not found');

    }).then(data => renderCountry(data, 'neighbour'))
    .catch(err =>{ console.error(`${err} 💥💥💥`);
            renderError(`Something went wrong🔴 ${err.message}. Try Again!`);
        })
    .finally(()=>{
        countriesContainer.style.opacity = 1;
    }) 
}

//getCountryData('australia'); //Test case for no neighbouring country

//Lecture 10 : Asynchronous behind the Scenes: The Event Loop

//JS Runtime - container that includes all necessary pieces of JS code execution
//Heart of runtime is JS Engine which has heap(Object storage location) and call stack(Where code is actually executed) - Only one thread of execution 
//Web APIs provided to the JS engine but not part of JS like Fetch API, DOM and Timers, Geolocation
//Callback Queue(ordered list of the call backs to be executed) - is a datastructure that has ready to be executed callback fns - attached to some events that has occurred. When call stack is empty the event loop takes the call back fn from call back queue and puts in the call stack to be executed. If a timer call back fn is put in call back queue which already has 5 other fns it will only run after the 5 call back fns are executed, so no gurantee that the timer call back fn will exactly run after the specified timeout  

//So Event loop makes the asynchronous behavior possible in JS - this is how JS has nonblocking concurrency(how a language handles multiple things at a same time) model. So the asynchronous task related to the DOM runs in the Web APIs environment of the browser- like ajax calls, timers, image load - and call back attached to load events and then method are registered in Web API to react to future value of the promise or event emitted

//DOM events use the call back queue to run their attached call back fns, Each time when an callback fn was taken from the queue and put it into the call stack(only when it is free) an event loop tick happends - so event loop does orchestration of entire JS runtime and decides when a call back fn is executed in call stack and the runtime manages the asynchronous behavior in JS

//Asynchronous code - is the code that is deferred in future only after particular event happens - call back registered in Web API environment

//With promises - data is arrived and fetch is done - call back registered with this promises with "then" mthd dont go into callback queues - callback of promises have a special queue for themselves called microtasks queue - and this queue has higher priority over the callback queue - At the end of the event loop tick the event loop first checks if there are any call backs in the microtasks queue - if there are then the event loop runs all of them before they run any of the callback fns from regular callback queue. If we keep adding more and more microstacks their is a possibility that they can actually starve the callback queue - rearely happens

//Lecture 11 : The Event Loop in Practice
//top level console logs will be printed first (synchronous code)
console.log('Testing Event Loop Behavior');
//Timer call back will run after the call back fn execution of the micro tasks completes so it might run little late after 0sec
setTimeout(()=> console.log('0 sec timer'),0);
//Build a promise that immediately resolves and has a fulfilled success value - returns after 0 sec since it is immediate - this will be executed first from the micro tasks queue
Promise.resolve('Resolved Promise 1').then((res) => {
    //call back fn called with fulfilled success value which we defined
    console.log(res);
});

Promise.resolve('Resolved Promise 2').then((res) => {
    //Stimulate heavy task to run for a long time
    /* for(let i =0; i<1000000000; i++){
        //call back in microtasks takes a long time to complete not the promise
    } */ //Only after this the timer call back will be executed, so we cant do high precision things or time sensitive tasks with timers

    //call back fn called with fulfilled success value which we defined
    console.log(res);
});

console.log('Test End');

//Lecture 11 : Building a Simple Promise - Lottery example - using Promises(special kind of built in class in JS)

//Promise constructor takes in one argument so called executor function - as soon as the constructor is called it runs this executor fn by passing two arguments 
const lotteryPromise = new Promise(function(resolve, reject) { //returns new Promise
    //asynchronous code - which produce future value
    console.log("Lottery draw is happening 🤞");
    setTimeout(function(){
        if(Math.random() >= 0.5){
            //fullfilled promise - call resolve fn with fullfilled value - whose promise returned can be handled with "then"
            resolve('You WIN 🤑 the Lottery'); 
        } else{
            //fullfilled value(either string or new Error object) of reject fn is passed into it which can be later handled with catch 
            reject(new Error('You lost your money 🐶'));
        }
    }, 2000)
    
}) ;
//consume promises
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying - Converting call back based asynchronous behavior into promise based asynchronous code

//Promisifying setTimeout fn- by create wait fn 
const wait = function(seconds){
    //create and return promise as fetch function does - encapsulated the asynchronous operation
    return new Promise(function(resolve){
        //It is impossible for the timer to fail so we will never mark the promise as rejected using reject fn 
        //call back fn to be called after the timer is the resolve fn - not mandatory to pass in the resolved value to resolve fn
        setTimeout(resolve,seconds*1000);
    })
}
//consume the promise - but no resolved value is sent to "then" fn
/* wait(1).then(() => {
    console.log(`1 second passed`);
    //To chain two sequential AJAX calls we returned one fetch call within the another 
    return wait(1) //to wait for another sec - return a new promise  
}).then(()=>{
    console.log(`2 seconds passed`);
    return wait(1) 
})
.then(()=>{
    console.log(`3 seconds passed`);
    return wait(1) 
})
.then(()=>{
    console.log(`4 seconds passed`);
    return wait(1) 
})
.then(()=>{
    console.log(`5 seconds passed`);
});//Chain of asynchronous code that happens in sequence without the call back hell
 */
//To create fullfilled or rejected promise immediately - by calling static method on Promise constructor
Promise.resolve('You WIN the Game 🎮').then((res) => console.log(res))
//No then method called since they will be no resolved value
Promise.reject('You lost the game 🕹️').catch((err) => console.error(err))

//Lecture 12 : Promisifying the Geolocation API
//Asynchronous behavior of geolocation API - code execution will not be blocked while getting the position - offloaded its work to Web API env
/* navigator.geolocation.getCurrentPosition((position) => console.log(position),
    (err) => console.error(err)); */ //callback based API

console.log("Retrieving Position in background");

//Promisifying a call back based API to promise based
const getPosition = function(){
    return new Promise(function(resolve,reject){
        //In resolve fn we pass in the fullfilled value in case the fn is successful - we then handle it using "then" fn outside of promise
        /* navigator.geolocation.getCurrentPosition((position) => resolve(position),(err)=>reject(err)); */
        navigator.geolocation.getCurrentPosition(resolve,reject); //resolve itself a callback fn called with positional argument and reject with error
    })
};

/* getPosition().then((pos) => {
    console.log(`The current location is ${pos}`);
    console.log(pos.coords);
}) */

const whereAmIGeo = function(){
    getPosition().then((pos) => {
        const {latitude:lat ,longitude:lng} = pos.coords;

        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    }).then((response)=> {
        if(!response.ok){
            throw new Error(`Fast reload, Try again later😐 ${response.status}`)
        }
        return response.json()
    }).then((data) => {
        // console.log(data);
        const {city,country} = data;
        
        if(!country)
            throw new Error(`Fast reload, Throttled API😐 Try again later`)

        console.log(`You are currently in ${city}, ${country}`);

        return fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`);

    }).then((response) => {
        if(!response.ok){
            throw new Error(`Country not found 😐 ${response.status}`)
        }
        return response.json();
    }).then((data) => {
        renderCountry(data[0]);
    }).catch((err)=>{
        console.error(`Something went wrong! ${err.message}`)
    }).finally(() => {
        countriesContainer.style.opacity = 1;
    })
}; //flat chain of promises

//btn.addEventListener('click',whereAmIGeo);

//Lecture 13 : Consuming promises with Async/Await
//Async function - a function that keeps running in the background - we can have one or more await statements inside an async function
const whereAmIAsync = async function(){
try{
    //Geo location
    const pos = await getPosition();
    const {latitude: lat,longitude : lng} = pos.coords;

    //reverse Geo coding 
    const geoResponse = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    console.log(geoResponse);
    if(!geoResponse.ok) throw new Error('Problem getting location data');
    const resData = await geoResponse.json();
    // console.log(resData);
    //await needs a promise to be returned by the fn - await keyword waits for the result of the promise - stops the code execution at this point of the fn until the promise is fullfilled - Stopping execution in an async function is actually not a problem - because it is running asynchronously in the background - so it is non blocking(not blocking the main thread of execution)- result value of the promise is then stored in a variable
    const response = await fetch(`https://countries-api-836d.onrender.com/countries/name/${resData.country}`); //but internally handled using "then" method
    console.log(response);
    //Even though error is thrown from async fn the promise is still fulfilled
    if(!response.ok) throw new Error('Problem getting country');

    const data = await response.json() //no chaining of promises with await
    console.log(data);
    renderCountry(data[0]);

    return `You are in ${resData.country}`;
}catch(err){ //rejected promises and errors are caught here
    //console.error(`${err} 💥 `);
    //render in html container
    renderError(`Something went wrong 💥 ${err.message}`);

    //Manually reject promise returned from async function - rethrow it
    throw err;
}
} //awaiting for 5 promises in a easy way

//const country = whereAmIAsync(); //async fn runs in web API env and always returns promise - JS only knows the return value after the async fn completes execution - and makes the return value as the fullfilled value of the promise

//the above will just return a pending promise but we need to use "then" method to display the fullfilled value - even error occurs still the then fn callback will be called since promise is successful - so to catch the err in catch block rethrow the error - we can also add finally which will always get executed
/* whereAmIAsync().then((country) => console.log(country)).catch(err => console.error(`${err.message} 💥💥`)); */

//If any error occurs then the code never returns and immediately jumps to catch block - country or fullfilled value will be undefined

//console.log(`Getting country through promise ${country}`);
console.log("Async Await");

//Lecture 14 : Error Handling with async and await - try catch
//wrap code in try block which JS will try to execute
/* try{
    let var1 = 1;
    const var2 = 2;
    var2 = 3;
}//access to error occurred in the try block
catch(err){
    alert(err.message);
} */

//We are going to use try catch to handle errors in async functions - refer whereamIAsync

//Lecture 15 : Returning values from Async Functions - refer whereamIAsync
//await can only be used inside an async function - so instead of creating a new fn we can use immediately invoked functions
(async function(){
    try{
    const country = await whereAmIAsync();
    console.log(`2: ${country}`);
    }catch(err){
        console.log(`2: ${err.message} 💥`);
    }
    console.log('3: Finished getting location'); //always be executed like finally
})();

//Lecture 16 : Running Promises in Parallel
//Getting data for countries in parallel and order of retrieval is not a matter
const get3countries = async function(c1,c2,c3){
    try{
        //We are running ajax calls one after the other even though the second ajax doesnt depend on the first one - instead of running these promises in sequence we can run them in parallel - save valuable loading time
        /* const [data1] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`);
        const [data2] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`);
        const [data3] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`); 
        console.log([data1.capital,data2.capital,data3.capital]);*/

        //all is a static method on promise constructor - takes in array of promises and returns a new promise which will then run all the promises in the array at the same time and returns an array 
        const data = await Promise.all([getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)]);

        //One thing to note is if one of the promises in the array rejects then the whole promise.all(combinator functions that allows to combine multiple promises) gets rejected, so this short circuits when one promise rejects

        console.log(data.map(d => d[0].capital));
    }catch(err){
        console.log(err);
    }
};
get3countries('usa','canada','australia');

//Lecture 17 :Other Promise Combinators: Race, Allsettled and Any
//Promise.race  - receives an array of promises and returns a promise - this promise is settled as soon as one of the input promises is settled(simply means that value is available doesnt matter whether the promise got rejected or fullfilled), so first settled promise wins the race
//immediatelly invoked functions
(async function(){
    const res = await Promise.race([getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`)]);
    //these 3 promises will race against each other, if the winning promise is a fullfilled promise, then the fullfillment value of the winning promise will be the fullfillment value of the race promise - only we get one result - even promise that gets rejected shortcircuits the Promise.race

    console.log(res[0]);
})();//helps to prevent against long running promises

//Timeout promise that rejects as soon as certain timeout passes - helpful when user's internet connection is slow
const timeout = function(sec){
    return new Promise((_,reject) =>{
        setTimeout(function(){
            reject(new Error('Request took too long !'))
        },sec*1000)
    } )
}

//Now we will race against the timeout 
Promise.race([getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),timeout(1)]).then((res)=>console.log(res[0])).catch(err => console.error(err));

//if the timeout happens first then the promise.race will be rejected - and aborts the rest of the fetch that are happening in the array

//Promise.allSettled ES2020 - takes in array of promises and returns an array of all the settled promises - never short circuits even if a promise gets rejected - fullfilled values of both rejected and successful promises are returned in an array

Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success'),
]).then(res => console.log(res));

//returns error, since short circuits if one of the promise gets rejected
/* Promise.all([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success'),
]).then(res => console.log(res)).catch(err => console.error(err)); */

//Promise.any [ES 2021] - Promise combinators
//This takes in an array of multiple promises and returns the first fullfilled successful promise it simply ignores the rejected promises
Promise.any([
    Promise.reject('Error 1'),
    Promise.reject('Error 2'),
    Promise.resolve('Another Success'),
]).then(res => console.log(res)).catch(err => console.error(err));