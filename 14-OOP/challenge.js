console.log("Coding Challenge 1");

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
//constructor function - first letter of the name should be in Caps
const Car = function(model, curSpeed){
    this.model = model;
    this.curSpeed = curSpeed;
}

//prototypal inheritance
Car.prototype.accelerate = function(){
    //this refers to the obj on which the method is called
    this.curSpeed += 10;
    console.log(`${this.model} is going at ${this.curSpeed} km/hr`);
}

//public interface that is used to communicate with the car object 
Car.prototype.brake = function(){
    this.curSpeed -= 5;
    console.log(`${this.model} is going at ${this.curSpeed} km/hr`);
}

const bmw = new Car('BMW',120);
const mercedes = new Car('Mercedes',95);

//IN OOP we pack both the functionality and data into objects so here in bmw it holds the current state of the car along with methods to manipulate its own data
bmw.accelerate();
bmw.brake();
bmw.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();

console.log("Coding Challenge 2");

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
    constructor(model, curSpeed){
        this.model = model;
        this.curSpeed = curSpeed;

    }

    accelerate (){
        //this refers to the obj on which the method is called
        this.curSpeed += 10;
        console.log(`${this.model} is going at ${this.curSpeed} km/hr`);
    }
    
    //public interface that is used to communicate with the car object 
    brake (){
        this.curSpeed -= 5;
        console.log(`${this.model} is going at ${this.curSpeed} km/hr`);
        return this;
    }

    get speedUS(){
        return this.curSpeed / 1.6;
    }

    set speedUS(speed){
        this.curSpeed = Math.floor(speed * 1.6);
    }
} 

const ford = new CarCl('Ford',120);
console.log("current speed in miles/hr", ford.speedUS);
ford.speedUS = 56;
//set the curSpeed property of the ford object
console.log(ford.curSpeed);

ford.accelerate();
ford.brake();

console.log("Coding Challenge 3");

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function(make, speed, charge){
    Car.call(this, make, speed);
    this.charge = charge;
}

//Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}
//Child class override a method from parent class
EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed} km/hr, with a charge of ${this.charge}`);
}

const tesla = new EV('tesla', 120, 23);
tesla.chargeBattery(90);
//uses the brake method of its Car prototype
tesla.brake();
//First method that appears in the chain will be called 
tesla.accelerate();


/* console.log(tesla.prototype);
console.log(tesla.__proto__);

console.log(EV.prototype);
console.log(EV.__proto__);

console.log(Object.prototype);
console.log(Object.__proto__);

console.log(EV.prototype.__proto__ === Object.prototype);
console.log(tesla.__proto__ === EV.prototype); */


console.log("Coding Challenge 4");

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chaining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCl extends CarCl{
    //private fields/public fields must be declared in the enclosing class before it can be used
    #charge;
    constructor(model, curSpeed, charge){
        super(model,curSpeed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        return this;
    }

    accelerate(){
        this.curSpeed +=20;
        this.#charge--;
        console.log(`${this.model} is going at ${this.curSpeed} km/hr, with a charge of ${this.#charge}`);
        return this;
    }
}

const rivian = new EVCl('Rivian',120,23);
console.log(rivian);
// console.log(rivian.#charge); -> this wont work since from outside private fields are not accessible- can only manipulate using chargeBattery public API
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate(); //chaining

//child class also inherit getters and setters from parent class
console.log(rivian.speedUS); //speed converted to miles/hr

//setting the speed
rivian.speedUS = 60.87;
console.log(rivian.speedUS); //retrieves the curSpeed set in km/hr