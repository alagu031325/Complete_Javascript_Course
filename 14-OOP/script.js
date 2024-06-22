'use strict';

//Lecture 1 - What is Object oriented Programming

//1. OOP - Programming paradigm(how we write and organize the code) based on the concept of objects

//2. Objects used to describe aspects of the real-world(user) or abstract features(HTML component) - pack both data(properties) and the corresponding behavior(methods) into one block - self contained block of code - can interact with one another using public interface(API) - easier to maintain and more flexible to add new functionality

//3. Class - allows to generate objects programmatically- it is a blueprint from which new objects are created based on the rules described in class - it is abstract nothing tangible - no real world data just describes the entity - Only instances created from that class are assigned with real world data

//4. Fundamental OOP Principles - helps to model real world data into classes - 
//1) Abstraction - hide details that dont matter - allowing the user to get perspective of the thing that he is using instead of messing with details, Like addEventListener function, we dont know the underlying implementation - low level details of how exactly it works is abstracted from the user for ease of use

//2) Encapsulation - Keep some properties and methods "private" inside the class, so that they cant be accessed outside the class. However some public methods can be exposed as public interface/API - helps to prevent external code from accidentally manipulating the internal properties/state(data) - private methods can be easily modified, without breaking the code from outside which rely on some of these methods - only should leave essential methods public and rest all encapsulated

//3) Inheritance - When we have two classes that are closely related(shares all the properties and methods) - we can have one class inherit from another - Like child class extends from parent class - making all properties and methods of parent class available to child class, forming hierarchial relationship between classes. This allows to reuse common logic and model real world relationships

//4) Polymorphism - A child class can overwrite a method it inherited from a parent class - Like its own version of method overwriting the inherited method

//Lecture 2 - How OOP is implemented in JS
//Classical OOP - Objects(instances) are instantiated from a class 
// Prototypes - All objects in JS are linked to a prototype (have methods and properties defined that the linked objects can use) - prototypal inheritance - it is a instance that is inheriting from a class - and object delicate behavior(methods) to the linked prototype object(Delegation)
//Array.prototype is the prototype of all the arrays that we create in the JS - the prototype object contains all the array methods including map and filter - Any array created is linked to this Array.prototype so that they can access all array methods defined in prototype object - arrays delegate the behavior of mapping to its prototype
//3 ways of Implementing Prototypal inheritance in JS
// 1. Constructor functions technique - way of creating objects from a function - this is how built-in objects like Arrays, Maps or Sets are implemented

//2. ES6 classess - Modern altenative to constructor function - ES6 classes acts as a layer of abstraction over constructor functions(behind the scenes implemented with constructor fns - use prototypal inheritance) but works exactly in the same way

//3. Object.create() - easiest and straightforward way of linking an object to a prototype object

//Lecture 3 - Constructor functions and the new operator
//Constructor fn is used to build objects with functions - called with new operator
const currentYear = new Date().getFullYear();
console.log(currentYear);
//constructor fn for a person - should always start with a captial letter - Arrow function will not work as a constructor fn because it doesnt have its own this keyword and we need that - only fn decalrations or fn expressions
const Person = function(firstName, birthYear){
    //the property doesnt have to be the same name as the parameters
    //instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //methods - assign a fn to a property - but we should never create a method inside of a constructor function - if we create 100 objects then 100 copies of this fn will be created 
    /* this.calcAge = function(){
        console.log(`Your age is ${currentYear - this.birthYear}`);
    }; */ 
    //To solve this prob we are going to use prototype and prototype inheritance
}

//Add static method to Person
Person.hey = function(){
    console.log(`Hey there 😎`);
    //Here the this keyword will refer to the entire Person constructor function
}

//this method will not be inherited to all objects
Person.hey();

//calling with new 
const nannyPlum = new Person('Nanny Plum',1992);
console.log(nannyPlum);

//new not only calls the fn but also does the following 
//1. New empty object {} is created
//2. Then function is called and the "this" keyword is set to the newly created object (this = {})
//3. The newly created object {} is linked to a prototype - this creates the objects __proto__ property and sets it value to the prototype value of the constructor fn that is being called
//4. function automatically returns the this keyword pointing to the created object

//can create any number of objects from the Person constructor fn 
const redBread = new Person('Red Bread',1986);
const wiseOldElf = new Person('Wise Old Elf',1975);
//Person is a blueprint and these are actual objects with data in them (instances)
console.log("two more objects created by Person",redBread,wiseOldElf);

//operator to test for instancetype
console.log("instance created from person",redBread instanceof Person);

//Lecture 4 - Prototypes
// Each and every fn in JS automatically have a property called prototype and that includes constructor functions - every object that we create with this constructor fn will get access to all methods and properties that we define on that constructor prototype property

//Accessing prototype property of the constructor fn
Person.prototype.calcAge = function(){
    console.log(`Your age is ${currentYear - this.birthYear}`);
};

//Now all objects inherit this prototype property
nannyPlum.calcAge() //we can access this fn because of prototype inheritance
redBread.calcAge() //there exists only one copy of this fn, but objects created using the Person constructor fn can reuse this method on them

//this keyword is set to the object that is calling the method

//Any object will always have access to the methods and properties from its prototype - and nannyPlum, redBread prototype is Person.prototype

//special property representing the prototype of nannyPlum
console.log(nannyPlum.__proto__);

//This will be equal to that of the constructor fn 
console.log(nannyPlum.__proto__ === Person.prototype);

//Person.prototype is not the prototype of Person but instead it is what is going to be used as the prototype of all the objects that are created with Person constructor fn - Important

//Built in methods to confirm this
console.log(Person.prototype.isPrototypeOf(nannyPlum)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false (not a prototype of Person itself)

// We can also set properties on the prototype
Person.prototype.show = 'Ben and Holly Little Kingdom';
console.log(nannyPlum.show,redBread.show); //get access to "show" property from the prototype - but it is not its own property(it is an inherited property)

//Way to check for inherited property
console.log(nannyPlum.hasOwnProperty('firstName')); //true
console.log(nannyPlum.hasOwnProperty('show')); //false - property not inside nannyPlum object but has access to ot through its prototype

//Lecture 5 - Prototypal Inheritance and the Prototype chain
//Person.prototype property has reference to the Person, Person.prototype.constructor will point back to Person constructor function - this prototype property is the prototype of all objects created by Person. 

//Each object has __proto__ property pointing to the prototype property of its constructor function, in this case it is Person.prototype - this will be the prototype of the newly created object

//constructor function always returns the newly created object and we dont explicitly return any thing

//If a property or method cant be found in a certain object then JS will look into its prototype, and use them if exists - prototypal delegation

//We can call calcAge() method from all objects created from Person without directly attaching those methods to each of them. 

//Prototype Chain - All objects in JS has prototype, and Person.prototype is an object - and its __proto__ property refers to Object.prototype - because it is built using Object constructor function (called whenever we create a object literal) - This series of links between objects is the prototype chain and always Object.prototype will be at the top of the chain and its __proto__ property set to null. Whenever JS cant find certain property or mthd it looks up the next prototype in the prototype chain. 

//Lecture 6 - Prototypal inheritance on Built in Objects such as Arrays

//Object prototype (top of prototype chain)
console.log(nannyPlum.__proto__.__proto__);
//Object.__proto__ = null
console.log(nannyPlum.__proto__.__proto__.__proto__);

//Person has a constructor property that will point back to the Person constructor fn itself - returns the fn 
console.log(Person.prototype.constructor);
//console.dir(Person.prototype.constructor) --> To inspect that fn 

//Any function is also an object so it has the __proto__ property 
//Arrays = [] === new Array (shorthand representation)
const arrSample = [7,10,23,45,7,10,67,78];
//Each Array inherit methods from its prototype - Array.prototype
console.log(arrSample.__proto__);
//The prototype property of the Array constructor function is going to be the prototype of all the objects created using that constructor 
console.log(arrSample.__proto__ === Array.prototype);//will be true

//the prototype property itself is a object and any object will have access to Object.prototype methods and properties - reusing the existing methods
console.log(arrSample.__proto__.__proto__);

//Array.prototype.filter() - the filter array method lives in the prototype property of the Array constructor function

//Adding new method to the Array.prototype so that all objects created using this constructor fn will inherit it 
Array.prototype.unique = function(){
    //this keyword points to the array on which this method is called
    return [...new Set(this)];
};
//we can call the defined method in any array that we want - but extending the prototype of the existing Object is generally not a good practice- because JS can add a new method with the same name and it will break the existing code and if multiple developers implement the same method with diff names then it can cause confusion
console.log(arrSample.unique());

//DOM element - are also Objects
const h1 = document.querySelector('h1');
//console.dir(h1) -> shows the __proto__ to be HTMLHeadingElement prototype - has a 6 or 7 level prototype chain narrowing down to HTLMElement -> Element -> Node -> EventTarget -> Object 

console.dir((x,y) => x+y ); //anonymous fn (object) --> __proto__ will point to methods of Function constructor prototype - this the reason we can call methods on user defined functions

//Lecture 7 - ES6 Classes
//class expression 
/* const PersonClass = class {
    //without arguments - classes are special kind of functions - so we can have either class expressions or class declarations

} */

//class declaration
class PersonCl {
    //constructor method 
    constructor(fullName, birthYear){
        //pass in the value of properties to be set in the newly created object
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    //instance methods
    //All methods will be on the .prototype property of the PersonCl class which will be the prototype for the objects created from that class - 
    calcAge(){
        console.log(`The current year is ${currentYear - this.birthYear}`);
    }

    //second method to the prototype
    greet() {
        console.log(`Welcome ${this.firstName}`);
    }

    //getter for age property - so we can read the age of any object using the age property
    get age(){
        return currentYear - this.birthYear;
    }

    //getters and setters are used for data validation
    //setter to validate the full name - creating a setter for a property name that already exists so when the property is set this method will be called to set the value - use this pattern to set a property that already exists
    set fullName(name){
        //not only exists on array but also includes is on strings
        if(name.includes(' ')){
            //changing the property name to avoid conflicts, sinec both the setter and the property above are trying to set the same name it might lead to error
            this._fullName = name;
        }
        else
        {
            console.log(`Alert !!! ${name} is not a full name!`);
        }
    }

    //so no more fullname property will exists to we should use the getter
    get fullName(){
        return this._fullName;
    }

    //static method - are not available to instances but are useful to create helper methods abt a class or abt constructor fn
    static hey(){
        console.log(`Hey there 😎`);
        //Here the this keyword will refer to the entire PersonCl class
    }
}

PersonCl.hey();

//constructor is called and will automatically returns the newly created object
const ben = new PersonCl('ben Elf',1992);
ben.calcAge();
console.log("getter fn - age",ben.age);
console.log(ben.__proto__ === PersonCl.prototype);//true

//manually adding a prototype method
/* PersonCl.prototype.greet = function(){
    console.log(`Welcome ${this.firstName}`);
} */
//prototypal inheritance
ben.greet();

//returns error if we dont( provide full name - name not set on holly 
const holly = new PersonCl('Holly',1996);

//1. Classes are not hoisted - even if they are class declarations - cannot be used before declaration
//2. Classes are firstClass citizens - can pass them into functions and return them from functions
//3. Classes are executed in strict mode - even though it is not defined in script

//Lecture 8 - Setters and getters - feature common to all objects in JS
//these special properties are accessor properties while other normal properties are data properties

const account = {
    owner: 'Nanny Plum',
    movements: [200,530,120,300],

    //to add getter to this object
    get latest(){
        return this.movements.slice(-1).pop();//slice returns an array 
    },

    //setter method - to add new movement to the array - should have exactly one parameter
    set latest(latestMov){
        this.movements.push(latestMov);
    }

    //not mandatory to have both setter and getter for a same property 

}

//we dont call get methods as methods but we call as simple properties
console.log(account.latest); //read something as a property but still can do some calculations before returning

account.latest = 440; //argument to be set , doesnt return anything
console.log(account.movements);

// However classes also have getters and setters and they do work in the exact same way - refer to PersonCl

//Lecture 9 - static methods
//from method is attached to the Array constructor itself - so we cant use the "from" method on a array object - since it is related more to Array - "from" is in Array namespace
console.log(Array.from(document.querySelectorAll('h1'))); //converts NodeList to an array

//Number.parseFloat(12.2) -> static method attached to Number constructor

//see manual static method implementation on constructor fn and also on a class - refer above - Person and PersonCl

//Lecture 10 - third way of implementing prototypal inheritance - Object.create 
//we can manually set the prototype of an object to any other object that we want - without the use of prototype property 

//recreate the Person class that has to be the prototype of all Person objects that we are going to create 
const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    //can have any name - similar to constructor fn 
    init(firstName,birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}
//pass in the prototype of the new object 
const kingThistle = Object.create(PersonProto); //empty obj created

//manually setting properties on the object
kingThistle.name = 'Thistle';
kingThistle.birthYear = 2009;
kingThistle.calcAge();

console.log(kingThistle.__proto__ === PersonProto);//true

//It is used to link prototypes to implement inheritance between classes. 

const queenThistle = Object.create(PersonProto);

//to set properties programatically 
queenThistle.init('Queen Thistle',2010);//this keyword points to queenThistle
queenThistle.calcAge();

//Lecture 11 - Inheritance between classess - constructor function

//All of the above techniques allows object to inherit methods from its prototype - delicate their behavior to their prototype.

//Real inheritance between classes - create Student Class(specific methods )inheriting from the Person class (generic methods that can also be used by student)

//1. Using Consturctor functions
/* const Person = function(firstName, birthYear){
    //the property doesnt have to be the same name as the parameters
    //instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
}; */

/* //Add static method to Person
Person.hey = function(){
    console.log(`Hey there 😎`);
    //Here the this keyword will refer to the entire Person constructor function
}
 */

//Accessing prototype property of the constructor fn
/* Person.prototype.calcAge = function(){
    console.log(`Your age is ${currentYear - this.birthYear}`);
}; */

//Child class 
const Student = function(firstName, birthYear, course){
    Person.call(this, firstName,birthYear);

    //Person(firstName,birthYear) => will not work since it is invoked as a regular function call and the this keyword is assigned to "undefined" so cant set firstName and birthYear 

    //additional property 
    this.course = course;
};

//linking prototype
Student.prototype = Object.create(Person.prototype);//we need to do this before we add any more methods to the prototype of student

//Student.prototype = Person.prototype -> assigns the exact same Person prototype object to student but we need to inherit from it but not the exact same object 

console.log(Student);

//Specific methods to Student class
Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const daisy = new Student('Daisy', 2020, 'Computer Science');
daisy.introduce();
//child classes to share behavior from parent classes - to establish this connection manually we need to use Object.create 

daisy.calcAge()

//Student prototype inherit from Person prototype, linked together
console.log(daisy.__proto__, Student.prototype.__proto__ , Person.prototype);
console.log(daisy.__proto__.__proto__);

console.log(daisy instanceof Student);
console.log(daisy instanceof Person);//both should be true because we linked the prototypes

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor) //should be pointing to Student but points back to Person

//Lecture 12 - Inheritance between classess - ES6 classes
//Prototype chain set up automatically by the extends keyword
class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course){
        //Always needs to happen first! since it is responsible for creating the this keyword in this subclass
        super(fullName, birthYear);
        //not mandatory to have new properties they can have just new methods and share the properties of parent class
        this.course = course;
        //if no additional properties then no need to have constructor fn itself, it automatically calls the parent constructor fn with the arguments
    }

    introduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    calcAge(){
        console.log(`I'm ${currentYear - this.birthYear} years old, but as a student I feel more like ${currentYear - this.birthYear + 10} 😎`);
    }

}

//const benElf = new StudentCl('Ben Elf',2012); //this will work even without defining the constructor function
const hollyPrincess = new StudentCl('Princess Holly',2014, 'Architecture');
hollyPrincess.introduce();
//new method that is overridden in the child class is called - because it appears first in the prototype chain
hollyPrincess.calcAge(); //method from parent class

//Lecture 13 - Inheritance between classes Object.create

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this,firstName,birthYear);
    this.course = course;
}

StudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const MrsElf = Object.create(PersonProto);//creates objects with the specified prototype and assigns to martha

//PersonProto will be the parent Prototype of MrElf since it is in the prototype chain
const MrElf = Object.create(StudentProto);

MrElf.init('Mr. Elf','2009','Mechanics');
//From StudentProto
MrElf.introduce()
//From PersonProto
MrElf.calcAge()

//We are linking objects together where some objects serve as prototypes of other objects - no need of constructors or properties and new operator

//Lecture 14/15 - ES6 classes - Encapsulation - Protected properties and methods

class Account{
    //1) Public fields (added to instances but methods added to prototype)
    locale = navigator.language;
    //_movements = []; //will be on all instances that are created from the class - they are not on the prototype

    //2) Private fields - truely not accessible from outside
    #movements = [];
    #pin; //create empty property and redefine it in the constructor

    constructor(owner,currency,pin){
        this.owner = owner;
        this.currency = currency;
        //this.pin = pin;

        this.#pin = pin; //shouldnt be accessed from outside - usage of "_" convention
        //we can create more properties that are not based on the passed parameters
        //this.movements = []; //common for all objects

        //should protect movements from unintentional data manipulation so add underscore - this is not truely private so we call this usage as protected property - this shouldnt be touched or manipulated outside of the class - should use public interface
        //this._movements = [];
        //this.locale = navigator.language;

        //We can even print any message 
        console.log(`Thanks for opening an account, ${owner}`);
    }

    //3) public interface/methods
    getMovements(){
        return this.#movements;
    }

    //public interfaces to work with movements property
    deposit(amount){
        this.#movements.push(amount);
        return this;
    }
    //can call other methods using "this" keyword inside of certain methods
    withdraw(amount){
        //abstracts that withdraw is a negative movement
        this.deposit(-amount);
        return this;
    }

    //Must not be able to access publicly - internal method that requestLoan method can use - add "_" to depict that this method only should be internally accessed within the class and not to be called from outside
    /* _approveLoan(val){
        return true; //can replace with some logic
    } */

    //this should be allowed to access publicly 
    requestLoan(val){
        if(this.#approveLoan){
            this.deposit(val);
            console.log(`Loan approved`);
        }
        return this; //makes methods chainable - basically sets some property so easily can be chained
    }

    //4) Private methods
    #approveLoan(val){
        return true; //can replace with some logic
    }

    //static verison of public methods
    static helper(){
        console.log("Helper"); //available on class
    }
}

const acct1 = new Account('Alagu','Rupee',25789);

//deposits and withdrawals
//Not good practice to interact with properties directly, we should create methods that will interact with these properties 
//acct1.movements.push(250); //deposits
//acct1.movements.push(-140); //withdrawal

acct1.deposit(250);
acct1.withdraw(140);

acct1.requestLoan(1000);
console.log(acct1.getMovements()); //movements accessible through public API


console.log(acct1);
Account.helper()

//Pin shouldnt be allowed to access publicly - so we need data encapsulation and data privacy - to prevent the code from outside of the class to accidently manipulate the data from inside of the class

//when we expose only small API - consisting of few public methods - then we can change all the other internal private methods with confident 

//Lecture 16 - Encapsulation - Private class fields and methods

// 1) Public, 2) Private fields - field is a property that will be on all instances - also called as instance field
// 3) Public and 4) Private methods - see examples in Account class
//there is also static version 

//movements and locale - these are two properties that are going to be on all objects that we create with this class - because we dont set by passing values into the constructor - so good candidate for public fields

//console.log(acct1.#movements);-> fields with private identifier is not accessible outside the class

//Lecture 17 - Chaining methods of the class
//deposit should return acct object so as to chain the withdraw fn on it
acct1.deposit(300).withdraw(35).requestLoan(25000).withdraw(4000);

console.log(acct1.getMovements());

//Lecture 18 - ES6 classes summary
//Constructor fn is mandatory in regular/parent class but it is optional in child class if it needs the same number and name of the parameters

//super has to be called in child class constructor before its own property assignment since the object itself is created by that method

//The fields set in constructor are personalized for each object while the public fields defined outside the constructor are usually common for all instances

//getter methods are used to get the value out of an object by simply writing the property name 

//setter are used to set the property by using the name instead of calling the method

//If we have a setter for a property that is already defiend in the constructor, then we need to create a new property with _ infront of it or else setting the same property twice will throw error - in getter return the property with _ naming convention

//static fields and methods are only available on the class- It cannot access the instance properties nor the instance methods inside them but only can call or access static properties/methods

//Classes are not hoisted, they are first class citizens, class body is always executed in strict mode and they are just syntactic sugar over constructor functions
