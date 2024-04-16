//Module file - camel case names
//Exporting module
console.log('Exporting module');

//Blocking code - 
/* console.log('Fetching users');
await fetch(`https://jsonplaceholder.typicode.com/users`);
console.log('Finish Fetching users'); */
//Only after fetching the users the code in the importing module is executed 

//All top level variables are private to this module
const shippingCost = 100;
export const cart = [];

//Exports - named export (just add export keyword to the variable - useful to export multiple things) and default exports
//export must happen in the top level code
export const addToCart = function(product,quantity){ //named export
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 345;
const totalQuantity = 12;

//To export all of these variables at the same time using named exports
export {totalPrice, totalQuantity as tq} ;

//default exports - we use them only when we want to export one thing per module - simply by exporting the value without the variable name
export default function(product,quantity){ //named export
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}

//Either use named exports or default exports whatever works well for this module

