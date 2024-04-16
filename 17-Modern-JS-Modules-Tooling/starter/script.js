///////Lecture 1 : An Overview of Modern JS Development

//We can divide our project into modules so that data can be exchanged between them and it is maintainable and we can even include third party modules/packages in npm repository (open source packages - we can use them in our own code Eg:JQuery, React, Leaflet) - npm is also the command line tool to install and manage packages

//Build Process - 

//1) Bundling - Join all modules into one file - can eliminate unused code and compress our code as well - it is important because all browsers dont support modules at all and code in the module will not be executed by older browsers - better for performance to send less files to the browser and then we do 

//2) Transpiling/Polyfilling - convert JS back to ES5 so that even older browser can understand our code without breaking - done using a tool called BABEL 

//Atlast the final JS bundle ready to be deployed on production server where real users access the website

//We will do this Build process through tools like "Web Pack" or "Parcel" - they transform raw code into JS bundle - these tools are available in npm repo aswell

//////Lecture 2 : An overview of Modules in JS
//Modules - Usually is a standalone file, reusable piece of code that encapsulates the implementation details 

//We can have imports and exports within the module - we can export values/functions out of the modules - whatever we export from a module is called a Public APIs - this is consumed by modules by importing the values and functions - so this module cant work without importing the code from external module so it creates dependency

//When the code base grows bigger then their will be many advantages of using modules, 

//1) They are small building blocks to build complex applications 

//2) Modules can be developed in isolation without thinking of the entire code - makes it easy to collaborate on a larger team 

//3) Used to abstract code, the modules who doesnt need to know about the low level details can simply import these abstractions from other modules 

//4) Leads to Organized codebase 

//5) Modules allow to reuse the same code within/across multiple projects

//ES6 - JS Modules
//JS Modules are stored in files, 1 module per file 

//Difference between script and modern ES6 modules

//1) Top level variables - scoped to ES 6 module (only if we export other modules can use this variable or else it remains private to that module) | In scripts - all top level variables are always global (this can lead to global namespace collision - multiple scripts try to declare the variables with same name and they collide)

//2) By default ES 6 modules are executed in strict mode | whereas scripts are executed in sloppy mode by default unless specified

//3) "this" keyword is always undefined in the top level of the module - but in scripts "this" keyword in global scope points to window object

//4) Can import and export values between them using ES6 import/export syntax | whereas in regular scripts importing and exporting values is impossible (They can only happen at the top-level , Imports are hoisted and are moved to the top of the file no matter where we are defining them - so importing values will be the first thing that happens in the module)

//5) To link it with html use script tag with type attribute set to "module"

//6) File downloading of modules are always happen in an asynchronous way whether they are loaded through html or through import statements | whereas scripts by default are downloaded by blocking synchronous way unless we use defer or async attributes on them

//How parsing modules work

//1) Parsing JS file - where code is read not executed inside the module - this is when all the imports are hoisted - Importing modules happen before the code in the main module is actually executed - These modules are imported synchronously so only after they are imported and executed the main script will be executed - this possible due to top-level imports - so the engine can know all the imports and exports during the parsing phase before the code execution(like outside of a function or an if block) - this helps bundlers to join more modules together and eliminate the repeated code

//2) These modules are then asynchronously downloaded - after they are arrived the modules export are linked(live connection - imports are just a reference to an exported values) to index.js (our file)- then code in imported modules are executed

//3) After the process of importing modules is done - the importing module that is index.js will be finally executed 

///////Lecture 3: Importing module
//All import stmts are hoisted to the top
//named imports need to be surrounded by {}

//ES modules work without the js extension - code here will be executed before the importing module code
console.log('Importing module');
/* import { addToCart,totalPrice as price,tq } from "./shoppingCart.js";
addToCart('bread',5);
console.log(price,tq); */

//To import everything that was exported by a module into an object use the below convention - creates a namespace for exported values from that module
// import * as ShoppingCart from './shoppingCart.js'

//ShoppingCart is like a object that has the public methods and properties exported from the module - everything else remains private
/* ShoppingCart.addToCart('Pasta',2);
console.log(ShoppingCart.tq); */

//This will import the default exported value - can give any name for the imported module - can also mix default and named imported at the same time - but in practice named and default exports are not mixed in the same module

//Code in script.js has to wait for the blocking code in shoppingCart.js to be finished - await outside of any async fn will block the entire module code execution along with the execution of its importing module

//import add,{totalPrice as price,tq } from './shoppingCart.js'
import add, {cart} from './shoppingCart.js'
//manipulating the cart array
add('pizza',5)
add('apples',2)
add('french fries',1)
add('banana',7)

//imports are live connection to the exported modules - cart is not simply a copy of the value which we exported but really a live (reference - point to the same memory location) to that value hence things added to cart are logged
console.log(cart);

//////Lecture 4: Top-level await (ES 2022) - we can now use await keyword outside of async functions inside modules

/* console.log('request initiated');
//This await keyword outside of the async fn is blocking the entire execution of the module code - use this with care - because if it is a long running task then it can starve the main code
const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
const data = await res.json();
console.log(data);
//This will executed only after the fetch asynchronous call is completed
console.log('Ended'); */

const getLastPost = async function()
{
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await res.json();
    //return an object using ES 2022 "at" method
    return {title: data.at(-1).title, text: data.at(-1).body}
};
const lastPost = getLastPost();
//Not very clean - instead inside modules we can use top level await
//lastPost.then(data => console.log(data));

//returns fullfilled value of the returned promise
//const lastPostTop = await getLastPost();
console.log(lastPost);

//If one module imports an top level await code from another module then importing module will wait until the execution of the blocking code is completed

/////Lecture 5: The Module Pattern - main goal is to encapsulate functionality and to expose public apis - best way to achieve this is by using functions - they allow us to have private data and return public apis(values) 
//iife - immediately invoked fn expressions - only called once and dont have to call it separately
//Not accessible from browser's global scope because it is private to this module
const shoppingCart2 = (function(){
    //main purpose is not to reuse code but just to create scope - and return data just once
    //Now all of the properties and methods are private because it is inside of the scope of the function
    const cart = [];
    const shippingCost = 46;
    const totalPrice = 467;
    const totalQuantity = 23;

    const addToCart = function(product,quantity){ //named export
        cart.push({product,quantity});
        console.log(`${quantity} ${product} added to cart`);
        //displays this variable since has access to all of the variables at its birth place even after the fn execution is over
        console.log(`Shipping cost is ${shippingCost}`);
    }

    const orderStock = function(product,quantity){ //named export
        console.log(`${quantity} ${product} ordered from supplier`);
    }

    //return some stuff withing an object to return public apis
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    }
})();
//Function is only executed once and returns a object but still we are able to manipulate the data created in that fn due to result of closures- allow fn to access to all variables that were present at its birth place. 

console.log(shoppingCart2.totalPrice,shoppingCart2.totalQuantity);
shoppingCart2.addToCart('Ginger bread',3);

//Properties/methods which we made private cant be accessed
//console.log(shoppingCart2.shippingCost); - undefined since private to that fn

//Limitations of this module pattern - if we want one module per script then we need to define one fn per script and link them in the html and should take care of the order of declaring scripts in html, all variables are available in global scope and finally we couldnt bundle them together using module bundler

/////Lecture 6: Common JS Modules
//Beside native ES6 modules and module pattern they are also other JS modules used in the past - but they are not native JS they relied on external implementations
//Eg is "common js" modules - are used by node.js, only recently es6 modules are implemented - all the modules in npm repository still use the common js module system because it was originally intended to be a node js - but now it acts as standard repo for all the JS world 

//In common js one file is one module
//export is a node js object - syntax to export in common.js is
/* export.addToCart = function(product,quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
} */

//Import in common.js - require is defined in node js because it is part of common js specification
// const {addToCart} = require('./shoppingCart.js');

/////Lecture 7: Brief introduction to the command line

//dir (ls in linux) - shows the contents of the current folder
//cd - change directory 
//clear console - clear
//mkdir - make new directory
//touch/edit - to create new files/can also create multiple modules/files at a time
//live-server - npm package can also be run 
//rm(linux)/del(windows) - to delete files
//mv <name of the file to be moved> <location to which it should be moved>
//rmdir - remove directory (empty dir)
//rm -R <name of the dir> - recurrsively deletes all the contents along with the dir

////Lecture 8: Introduction to NPM (Node package Manager) -

// Before npm we use to include external libraries directly into our html using the script tag - then will then expose global variables that we can use in our scripts

// This can create some problems - It is not good practice to have html loading all our JS - We need to change to the new version of the library manually - there was not single repo that contained all the packages that we needed - NPM allows us to manage our dependencies in a modern way

//NPM software - npm -v --> to check the verison of npm software
//TO use npm in each project we need to initialize it - "npm init" and it will ask set of questions to create package.json file - this file stores the entire configuration of the project

//install leaflet library using npm - npm install leaflet<package name> - dependency is added to package.json file and actual code will be in node_modules folder - it will not be easy to use without a module bundler - this library uses common js module system

//Installed lodash-es module and we can directly use without the bundler by using import and export es module features
//cloneDeep exported as default export see in cloneDeep.js
//import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js'
//Instead of manually typing the whole path we can just import the lodash-es library
import cloneDeep from 'lodash-es'; //can work with any common.js modules

//Nested objects
const state = {
    cart: [
        {
            product:'bread',
            quantity: 5,
        },
        {
            product:'pizza',
            quantity: 2,
        }

    ],
    user: {
        loggedIn:true
    },
};

const stateClone = Object.assign({},state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

// reference so loggedIn variable changed 
console.log(stateClone);
//exact copy so loggedIn variable not changed - deep clone from lodash 
console.log(stateDeepClone);

//Dont push the node_modules folder into git or into any other project folder they are already at npm - we should do "npm -i", then npm will reach to package.json file and look into the dependencies and install them back 

////Lecture 9: Bundling with Parcel and NPM scripts
//npm i parcel --save-dev --> for dev dependencies - dependencies that are not part of the code - locally installed package
//npm uninstall parcel
//npx - application built into npm - and execute parcel command by passing the entry point - and this will bundle script.js with shoppingCart.js and cloneDeep.js

//Hot module replacement - whenever the script.js is changed the changes are pushed to browser without browser refresh function - so existing states are retained
if(module.hot){
    module.hot.accept();
}

//We can also execute parcel with npm scripts - which used to run locally installed packages in command line - they also help to automate repititive tasks

//create a start script under the scripts tag - then run "npm run start<script-name>" - script name specified in package.json

//We are finished developing the project - we need to build to create a final bundle - that has the code elimination/code compression that is added as another script in package.json file

//We can also install packages globally -> npm i parcel -g --> live-server is globally installed - so we can use live server in every directory of our computer - we can directly run in the command line - but it is always advisable to install locally so they stay uptodate with the latest versions

////Lecture 10: Configuring Babel (helps to convert super modern code to ES 5 code) and Polyfilling 
//Parcel automatically uses babel to transpile(JS syntax to ES5 syntax) our code - Babels uses preset(bunch of plugins bundled together to transpile code), by default parcel uses "preset-env" check babel documentation "preset" - this will transpile only final features that are realized in JS and experimental features can be converted using babel plugins

console.log(cart.find(el => el >=2)); //returns the first element that matches the condition, parcel converts the arrow fn to ES5 fn but not the ES6 find method and also promises - that is because babel can only convert ES6 syntax like const, arrow fn, spread and classes where they have equivalent way of writing in ES5 - so for promises and array methods we can polyfill them - we need to import an external library for polyfilling (recreastes the find fn so that the Old browsers can use it)

//Polyfill will simply polyfill for all ES6 fns but we can do only for features that we have used by using cherry picking(to reduce bundle size) - by import only the needed features as below
//import 'core-js/stable/array/find'; -> this one only be polyfilled or definition added for use - not usually done
import '../core-js/stable';

//npm i regenerator-runtime
import '../regenerator-runtime/runtime' //This library is used for polyfilling async fns

////Lecture 11: Writing clean and modern JS code 
//Review lecture 
//Write readable code - descriptive variable/fn names(what they contain and do)
//DRY Principle - refactor code
//Dont pollute global namespace, dont use var, and use strong type checks
//Each fn should only do one thing (dont use more than 3 parameters) - use default parameters, return same datatype as received(code to follow), use arrow functions
//OOP - use ES6 classes - encapsulate data and implement public api for manipulating data outside the class - implement method chaining - In regular objects dont use arrow fns for methods because we wont get access to the this keyword of that object.
//Writing nested code generates bad readable code so use guard clauses(early return ) - use tenary or logical operator instead of "if" stmts, use multiple if instead of if-else, avoid "for" loops and use array methods, avoid call back based aysn APIs - consume promises with async/await - run promises in parallel(when they dont depend on one another) using all fn and handle errors and promise rejections

////Lecture 12: Declarative and Functional JS Principles(Guidelines only)
//Imperative code - we explain to the computer every single step to get the result
//Declarative code - programmer tells the computer only what to do - the how to get results is abstracted away
//Functional Programming - Declarative programming paradigm - by combining pure functions(doesnt depend on any external variables) - avoiding side effects(mutating data outside of a fn) - follows immutability principle - the state or data is never modified - Instead state can be copied and mutated and returned

//Avoid data mutations
//use built in methods that doesnt produce side effects
//Use data transformations methods such as map, filter and reduce
//Try to avoid side effects in functions created

//Use destructuring , spread, ternary and template literals where ever possible

////Lecture 13: Fixing bad code part 1 - refer clean.js

////Lecture 14: Fixing bad code part 2 - refer clean.js
