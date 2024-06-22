'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//Lecture 1: How to plan a Web Project
//Put yourself in the feet of the user and come up with user stories, which is the description of the application functionality from user's perspective
//As a user(who), (what functionality is needed), and (why) it is needed - general format of user story from which the features are built up
//List down the flow chart by starting with actions and results for each feature(what to implement)
//Then decide a programming language and draw the architectural diagram which contains details of APIs and functions(How to implement it)

//Lecture 2: Geolocation API - modern browser API 

//getCurrentPosition takes in two call back function - First one is called when browser successfully retrieved the user's current position and second is called when error happens while getting the coordinates

// let map,mapEvent; - defined as private class fields

//check if old browsers support geolocation - refer to getPosition()

//Lecture 3:Displaying Map using third party Library Leaflet
//can use either google maps or open street to display map using leaflet as above

//Lecture 4: Displaying a Map Marker - using Leaflet

//When we click on that map we need to handle that click exactly at that position so we need to access the coordinates of that map
//so instead of addEventListener method we need to use the mthd available on leaflet library (on method - refer above)

//Lecture 5: Rendering workout input form
//refer code in constructore


//Lecture 6: Project architecture - architectural diagram
//Where and how to store the data - in Objects
//Application UI data and business logic is separated into two different classes

//Lecture 7: Refactoring for Proj architecture
//Application - created based on architecture
class App{
    //private instance properties
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = []; //class fields


    constructor(){
        //get the position of the current object
        this._getPosition();

        //add eventListeners/Handlers to the DOM element - this keyword attached to the calling DOM element but we need to attach it with the "app" object
        form.addEventListener('submit',this._newWorkout.bind(this));
        
        //Event is triggered whenever we change the value of the select element in html
        inputType.addEventListener('change',this._toggleElevationField.bind(this));
        //movetoPopup event handler attached - this keyword will point to the DOM element so manually we need to bind it
        containerWorkouts.addEventListener('click',this._moveToPopup.bind(this));
        
        //Handlers to get data from Local Storage
        this._getLocalStorage();

    }

    _getPosition(){
        if(navigator.geolocation){
            //As soon as the user's current position is determined the loadMap callback function is called by JS by passing position parameter - on failure second method is executed - callback fn is called as a regular fn and not as a method and hence the this keyword is undefined - so we bind the this keyword - bind returns a new fn
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
                alert("Your current location couldnt be retrieved");
            })
        }
        
    }

    _loadMap(position) {
            //JS passes in GeoLocationPosition object while calling the fn 
            const {latitude,longitude} = position.coords;
            // console.log(latitude,longitude);
            // Generating current location in google maps
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    
            const coords = [latitude, longitude]
            //pass the id name of the html element where the map will be displayed - L is the leaflet namespace - also a global variable in Leaflet script can be accessed from other scripts as long as it is loaded before the current script
            this.#map = L.map('map').setView(coords, this.#mapZoomLevel); //(13 is the zoom level of the map)
            //can also use google maps - we can change the style of openstreet maps - maps are made from different tiles
            L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
    
            
            //Leaflet Library - on method which accepts type of event and the call back function - "this" keyword points to #map private field
            this.#map.on('click',this._showForm.bind(this))

            //render the markers of the existing workouts in the local Storage
            this.#workouts.forEach(workout => {
                this._renderWorkoutMarker(workout);
            });
        }

    _showForm(mapE) {
        //copy to global variable to be used in eventHandler fn
        this.#mapEvent = mapE;
        //show the form on click
        form.classList.remove('hidden');
        inputDistance.focus();
        //if we press enter key it will trigger submit event on the form - so add an eventListener for submit event
    
                /* L.marker([lat, lng]).addTo(map) //creates marker and adds to the map
                .bindPopup('workout location') //creates popup and binds to marker
                .openPopup(); */
    }

    _hideForm(){
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
        form.style.display = 'none' //immediately hide the form
        form.classList.add('hidden');//triggers the animation but we dont need that
        //settimeout calls the call back fn after the specified time in our case 1sec is 1000ms
        setTimeout(() => form.style.display = 'grid', 1000);

    }

    _toggleElevationField(){
            //closest finds the closest parent element - only one of them visible at a time
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    //creates new workout when form gets submitted
    _newWorkout(e){
        //arrow fn to validate the arbitary input elements - every method returns true only if the value returned is true for all of the array elements - even if one of the elem's condition evaluates to false, then the every method returns false  - Helper fns
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))
        
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        //prevent default reloading of page when form submits
        e.preventDefault()

        //Get data from form
        const type = inputType.value;//select element's value
        const distance = +inputDistance.value;//adding plus will convert the string to a number
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng; //object destructured
        let workout;
        //Check if data is valid

        // If workout is running, create running object
        if(type === 'running'){
            const cadence = +inputCadence.value;
            //Each value should be a number and a positive value
            /* if(!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)) return alert('Inputs have to be a positive numbers!') */
            if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert('Inputs have to be a positive numbers!')

            workout = new Running([lat,lng],distance,duration,cadence);
            
        }
        
        //If workout is cycling, create cycling object
        if(type === 'cycling'){
            const elevation = +inputElevation.value;
            //alert window is shown if any one of these is not a validInput
            if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
                return alert('Inputs have to be a positive numbers!')
            //But elevationGain might be negative - when cycling down hill

            workout = new Cycling([lat,lng],distance,duration,elevation);
        }
        //workout variable block scoped so may not be available outside of the block
        this.#workouts.push(workout);
        //Add new object to workout array 

        //Render workout on map as marker
        // console.log(mapEvent); -> mapEvent not in scope
        
        //we will create our own popup with css styling classes attached - we are calling the method using this(not a event handler), so this remains the same
        this._renderWorkoutMarker(workout)

        //Render workout on list
        this._renderWorkout(workout); //delegating functionality to other methods

        //Hide form 
        //clear input fields
        this._hideForm();

        //Set local storage to all workouts
        this._setLocalStorage();
        
    }

    _renderWorkoutMarker(workout){
        //coords tell leaflet where to show the markup
        L.marker(workout.coords).addTo(this.#map).bindPopup(L.popup({
            maxWidth:250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
        })).setPopupContent(`${workout.type === 'running'  ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`).openPopup();//most methods return this that makes these methods chainable
    }

    _renderWorkout(workout){
        // custom data attribute to build a bridge between UI and data in app
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running'  ? '🏃‍♂️' : '🚴‍♀️'}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `;

        if(workout.type === 'running'){
            //round pace to one decimal place
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </li>
            `
        }

        if(workout.type === 'cycling'){
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(1)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevationGain}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>  
            `
        }

        //First child of the workouts should be the form only the second child should display the activites - so insert as sibling element after the form
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){
        //we need the event to match the click
        const workoutEl = e.target.closest('.workout');//selects the parent element which has the id from which we can find the workouts coord from the workouts array my matching the id

        if(!workoutEl) return; //Guard clause
        //use find to match the first element with the id
        const workout = this.#workouts.find(workout => workout.id === workoutEl.dataset.id);

        //coords, zoomlevel as arguments and options obj
        this.#map.setView(workout.coords,this.#mapZoomLevel,{ 
            animate: true,
            pan: { 
                duration : 1
            }
        });
        //duration set on pan object

        //use public interface to track number of clicks on workout
        //workout.click();

        // console.log(workout);
    }

    _setLocalStorage(){
        //Local storage browser API - it is a blocking storage - cant handle large amount of data
        localStorage.setItem('workouts',JSON.stringify(this.#workouts)) //simple key value store, the value should also be a string so convert the workout object to a string
    }

    _getLocalStorage(){
        //pass in the key to retrieve the corresponding value 
        const data = JSON.parse(localStorage.getItem('workouts'));//converts string back to object

        if(!data) return; //No data


        //Prototype chain is modified no longer an object of workout class but an instance of Object class so cant access the click() method - or dont inherit any of the Workout methods - so local storage is a prob in this case 

        this.#workouts = data;//restoring data after reloads

        //Dont want to create a new array just need to render them on map and on the list
        this.#workouts.forEach(workout => {
            //reusability 
            this._renderWorkout(workout);
            //this._renderWorkoutMarker(workout);//trying to add marker to the #map which is not yet created it will take time to render map

        }
        )

    }

    //public interface to delete workouts
    reset(){
        localStorage.removeItem('workouts');
        //reload the page programmatically with location object on browser which contains lots of properties and methods
        location.reload(); 

    }
}

const app = new App(); //construcotr will be called

//Lecture 8 : Managing Workout data
//We will not create workout objects but instead either running or cycling
class Workout{
    //date of the workout - common fields for objects created from Classes
    date = new Date();
    //clicks = 0; //publicly accessible field

    //unique identifier - get the date(current timestamp) convert to a string by appending and slice the last 10 numbers, but always good to use third party libraries to generate unique id to store values in an array 
    id = (Date.now() + '').slice(-10);

    //contains data common to the child class
    constructor(coords, distance, duration){
        this.coords = coords; //array of lat and lng
        this.distance = distance;//in km
        this.duration = duration;//in min
    }

    _setDescription(){
        // prettier-ignore - to ignore the following line from formatting
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`  //Number between 0 and 11 - so used with 0 based arrays - month is 0 then it is january 
    }

    click(){
        this.clicks++;
    }
}

class Running extends Workout{
    type = 'running'; //will be available on all instances

    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration); //initializes the this keyword by calling parent constructor
        this.cadence = cadence;
        this.calcPace();//immediately calculate the pace
        this._setDescription();
    }

    calcPace(){
        //min/km
        this.pace = this.duration/this.distance;
        return this.pace;
    }
}
class Cycling extends Workout{
    type = 'cycling'; //will be available on all instances

    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration); //initializes the this keyword by calling parent constructor
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed(){
        //km/hr (so convert min to hr)
        this.speed = this.distance/(this.duration/60);
        return this.speed;
    }
}

/* const run1 = new Running([39,-12],5.2,24, 178);
const cycle1 = new Cycling([39,-12],27,95, 523);

console.log(run1,cycle1); */

//Lecture 9 : Creating new workout using classes - refer to _newWorkout method

//Lecture 10: Rendering workouts - the side bar of UI - check _newWorkout method

//Lecture 11 : Move marker on click
// Initially there are no workouts created on which we could click, so now to which element we need to attach the eventhandler to? so perform event delegation by adding the eventhandler to the parent element - refer to APP constructor

//Lecture 12: We want data to persist on page reload - Local Storage API - all workouts should be added to local storage - which is a place in the browser where we can store data that will retain even after page close - data linked to the URL of the application that we are using

//Lecture 13: Final Considerations



