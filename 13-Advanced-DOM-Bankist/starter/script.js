'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
//returns a nodeList
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); */

//NodeList has forEach mthd
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Lecture 1 - DOM Working behind the scenes
//DOM allows JS to interact with the browser, we can write JS to create modify and delete HTML elements, listen and respond to events, change/set styles, classes and attributes
//DOM tree has lots of methods and properties to interact with the DOM tree
//DOM tree has different types of nodes like text or html elements

//DOM Organized behind the scenes - Each node represented by JS object and has access to node related methods and properties
//Node has 4 different types of node, text, comment, element and document type- text goes to text node, html comments also gets a node , element gets its element node and gets access to different html properties and methods. Element type has HTMLElement child type and that has child type for each html element type like Div, Img and btn,links
//All the child type will have access to methods and properties of their parent node type - through inheritance
//Document is another type of node which has important methods such as createElement, getElementById,querySelector
//EventTarget which is parent to Node type and window has addEventListener methods which allows all the element/document to listen for events

//Lecture 2 - Select, create and delete elements using JS
//Selecting Elements
//documentElement represent the entire hmtl DOM element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body); //can also select them individually

//returns first element that matches the selector
const header = document.querySelector('.header');
//returns NodeList - doesnt update on DOM updation
const allSections = document.querySelectorAll('.section');

//for selection by id the selector # is not needed
document.getElementById('section--1');
//returns live HTML collection which changes if the DOM changes
const allButtons = document.getElementsByTagName('button');
//returns live HTML collection
console.log(document.getElementsByClassName('btn'));

//Creating and inserting elements
// .insertAdjacentHTML

//creates a DOM element and stores it in the variable but not anywhere in DOM
const message = document.createElement('div');
//object that represents a DOM element so we can use classList property
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);//adds this element as the first child of header
header.append(message); //adds this element as the last child of header
//will be inserted only once since message is a live DOM element so cant be at multiple places in the DOM - append moved the first child to be the last child

//To copy multiple times the same DOM element
//header.append(message.cloneNode(true));//true makes all the child elements to be copied too

//To add as sibilings
header.before(message);
//header.after(message); -> adds after the header element as sibling

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); //already message is selected - removes the DOM element
    // message.parentElement.removeChild(message); old way of deleting DOM
  });

//Lecture 3 - Styles, Attributes and classes
//CSS Styles - property name in camelCase
message.style.backgroundColor = '#37383d'; //these are set as inline styles

//styles defined in style sheet cant be retrieved using style property but only styles set manually via JS can be retrieved
console.log(message.style.backgroundColor);
console.log(message.style.color); //nothing is retrieved

//To retrieve the styles applied on the page
console.log(getComputedStyle(message).color); //getComputedStyle returns all the styles applied to this element and we can retrieve a particular prop from that

//height is not defined in CSS but computed by browser so even that prop can be retrieved
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';
console.log(message.style.height);

//CSS root variables /custom properties - so root is document.documentElement
//document.documentElement.style.setProperty('--color-primary', 'orangered'); //property name and value

//Accessing - Attributes of html element
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //retrieves the available html attributes

console.log(logo.className); //retrieves class
//Only for standard properties the JS creates a property on DOM if we add a new attribute called designer that cant be retrieved
console.log(logo.designer); //undefined - non standard attribute
console.log(logo.getAttribute('designer'));

//set attribute
logo.alt = 'Minimalist logo';
console.log(logo.alt);
logo.setAttribute('company', 'Bankist'); //new non standard attribute will be added

console.log(logo.src); //retrieves the absolute URL
console.log(logo.getAttribute('src')); //retrieves the relative URL

//same applied to href attribute on links
const navbar_link = document.querySelector('.nav__link--btn');
console.log(navbar_link.href); //absolute link
console.log(navbar_link.getAttribute('href')); //relative link

//Data attributes
//version-number -> accessed in camelCase as versionNumber
console.log(logo.dataset.versionNumber); //stored in dataset object

//data attributes are helpful to store data in the user interface/html

//Classes example - fake classes
logo.classList.add('a', 'b'); //can add multiple classes in addition to existing classes that are in DOM element
logo.classList.remove('a', 'b'); //can remove multiple class
logo.classList.toggle('a');
logo.classList.contains('b'); //can check for certain class

//logo.className = 'a'; //overrides all the existing classes and only allows to assign one class to the DOM element

//Lecture 3 - Implementing smooth scrolling
// 1st way - old browsers
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); //relative to viewport
  console.log(s1coords);
  //x and y are the distance between the element and the viewport top and left

  // console.log(e.target.getBoundingClientRect()); //retrieves rect bounding coordinates of the button

  //console.log('current scroll (X,Y)', window.pageXOffset, pageYOffset);
  console.log('scrollX scrollY', window.scrollX, scrollY); //gets the distance from the top of the page to the current viewport top position - Y coords

  console.log(
    'viewport height and width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth //dimensions of viewport available for content
  );

  //scrolling use the global function defined on window object
  /* window.scrollTo(
    s1coords.left + window.scrollX, //current position + current scroll
    s1coords.top + window.scrollY
  );  */
  //move us to the top of the section1 - top is relative to the viewport and not to the top of  document

  //by adding the scrollX and scrollY positions we made the top relative to the top of the document and not to the viewport

  //for smooth scrolling we can pass in a object
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
  // 2nd way - supported in new browsers
  /* section1.scrollIntoView({
    behavior: 'smooth',
  }); */
});

//Lecture 4 - Types of Events and Event Handlers
//Event is a signal generated by the DOM node - anything that happens on the web page

const h1 = document.querySelector('h1');
//mouseenter event is similar to hovering over the element
//modern/first way of listening to events
const alertH1 = function () {
  alert('addEventListener : You are reading the heading, Great!');

  //to remove after first occurrence use the event name and fn handler to be removed
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//can also remove the event listener after 3 secs

/* setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000); */

//second way of listening to the event - onevent property on the element - for each event there is a corresponding onEvent property with each element

/* h1.onmouseenter = function () {
  alert('onmouseenter : You are reading the heading, Great!');
}; */

//1. addEventListener allows us to add multiple event handlers to the same event but with the onevent property the latest function overrides the previous handlers
//2. addEventListener allows us to remove the eventHandler if we dont need it further - for that we should have named function handlers

//third way of listening to events - adding an onevent (like onclick) attribute to the html element <h1 onclick="alert('HTML alert')"> but not recommended

//Lecture 5 - Event Propagation: Bubbling and capturing
//events are not generated at the target element, where the event happened , rather it is generated at the root or top of the DOM tree. THen the event pass through every single parent element(not sibling elements) to its target element - capturing phase, then target phase begins where events can be handled, then the event traverse all the way up to the document root in the bubbling phase - events bubble up from the target to the document root - events propagation

//As the event bubbles through the parent element, it is similar to the event happening at the element so any eventlisteners attached to the parent element will also be executed - events can only be handled in the target and bubbling phase

//Not all elements have capturing and bubbling phase - some events has to be handled only in target phase

//Lecture 6 - Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

/* document.querySelector('.nav__link').addEventListener('click', function (e) {
  //this always points to the DOM element that the event handler is attached to
  this.style.backgroundColor = randomColor();
}); */

//During bubbling up the click event has also happened in all of the parent elements and hence the event handler is called
/* document.querySelector('.nav__links').addEventListener('click', function (e) {
  //this always points to the DOM element that the event handler is attached to
  this.style.backgroundColor = randomColor();
  //Stop event propagation - then the event will never propagate to the parent element
  e.stopPropagation(); - generally not recommended
}); */

//e.target will be the same in all 3 cases, because it points to the element where the click event happened, but e.currentTarget points to the element to which the event handler is attached
/* document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    //this always points to the DOM element that the event handler is attached to
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, e.currentTarget);
    //In any event handler the this keyword and e.currentTarget will be exactly the same pointing to the DOM element on which this eventhandler is attached to
    console.log(this === e.currentTarget);
  },
  false
); */ //If third parameter set to true, the event handler will no longer listen to bubbling event but to capturing event - by default it is set to false

//Each eventhandlers listen for events that happen on the target element(element itself) and also from the bubbling phase(Events that keep bubbling up from their child element)
//event handlers dont pick up events during the capture phase, since this phase is not very useful like bubbling phase(this can be used for event delegation). But still we can capture events in capturing phase using the third parameter sent to addEventListener function

//Lecture 6 - Use the power of event bubbling to implement event delegation - Implementing page navigation
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    //this.href will return the absolute URL so using getAttribute method
    const id = this.getAttribute('href');
    //select the element with the selector id
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
}); */

//attaching the exact same call back function to each element - is not efficient so we need to use event delegation, events bubble up so the event handler can be attached to the common parent

//will catch the bubble up event -1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //2. determine what element originated the event - the click that happens on nav__links element is irrelevant so shouldnt handle it
  const target = e.target;

  //Matching stratergy - to ignore clicks on nav__links element
  if (target.classList.contains('nav__link')) {
    //this.href will return the absolute URL so using getAttribute method
    const id = target.getAttribute('href');
    //select the element with the selector id
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});
//cant add eventhanlders to buttons that donot exist in DOM and that are added dynamically but still we can handle events on top of those functions by event delegation (Adding handlers to its parent element)

//Lecture 7 - DOM Traversing
//h1 tag already selected - traversing downwards: selecting the child elements
//selects the child elements with .highlight class no matter how deep the child elements are to the parent element h1, other elements which are not child with the same class will not be selected
console.log(h1.querySelectorAll('.highlight'));

//childNodes retrieves direct child nodes to h1, node could be html element, comments and text
console.log(h1.childNodes);

//returns HMTL live collection with only html element nodes - works only for direct children
console.log(h1.children);

//can change the style of first child element
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Traversing upwards - selecting parents
//selects the direct parent node of h1
console.log(h1.parentNode);

//selects the direct parent element
console.log(h1.parentElement);

//To select a parent element that is not a direct parent - we use closest method which receives a query string just like querySelector
//h1.closest('.header').style.background = 'var(--gradient-secondary)'; //can also set to custom properties

//Closest finds the parent element no matter how far up in the DOM tree and querySelector find the child element no matter how deep the child is from the parent element

//Traversing sideways: selecting siblings
//We can only access direct siblings
console.log(h1.previousElementSibling); //null since this is the first child
console.log(h1.nextElementSibling);

//to retrieve previous node and next node
console.log(h1.previousSibling, h1.nextSibling);

//to retrieve all children - we can traverse to the parent element and retrieve all children
//console.log(h1.closest('.header__title').children);

//or can access via direct parent element selection
console.log(h1.parentElement.children);

//can create an array by spreading and loop over it
[...h1.parentElement.children].forEach(function (el) {
  //comparison between html elements works fine
  if (el !== h1) {
    //all the sibling element is 50% smaller other than the h1 element
    //el.style.transform = 'scale(0.5)';
  }
});

//Lecture 8 - Building a tabbed component
//Selecting tab buttons
const tabs = document.querySelectorAll('.operations__tab');
//selecting the tab container
const tabsContainer = document.querySelector('.operations__tab-container');
//selecting the text content
const tabsContent = document.querySelectorAll('.operations__content');

//attach event handler to the common parent element
tabsContainer.addEventListener('click', function (e) {
  //e.target will retrieve the element clicked either the btn itself or the span element in it
  //need to find the btn element even when we click on the span element - so we use closest to traverse up the tree
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //If clicked on the container itself - we should do nothing but return
  //Guard clause
  if (!clicked) return; //null falsy value returned from closest

  //before adding it to the clicked class first remove the active class from already selected tab - Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Content area activation
  //remove the active class from all contents
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  //data-tab store text content in html - to retrieve we use the dataset property followed by the name of the data attribute - here it is tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Lecture 9 - Passing arguments to event handlers
//Menu fade animation - element selection
const nav = document.querySelector('.nav');//common parent to the logo and nav__links to which events bubbles up

const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    //traverse upward to retrieve the common parent 
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    //change the opacity 
    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
    
  }
}

//mouseover(mouseout) event similar to mouseenter(mouseleave - opposite events) event but mouseover can bubble up but mouseenter event doesnt bubble up to its parent

//we need to pass in value for this function but cant pass arguments directly because event is not defined until it happens and cant call a fn in addEventListener it only needs the function value which only JS will internally call the fn
//nav.addEventListener('mouseover', handleHover);  --> not possible 

nav.addEventListener('mouseover', function(e) {
  //manually call the fn
  handleHover(e,0.5)
});

nav.addEventListener('mouseout', function(e) {
  //manually call the fn
  handleHover(e,1)
});

//another version without using anonymous call back functions
//can use bind since it returns a new fn that can be used with "this variable" set to the passed in value - instead of pointing to the current target on to which the eventhandler is attached - so this way we can pass an "argument" to the handler fn - but it is not possible to pass arguments to event handler fn so we set the this keyword

//nav.addEventListener('mouseover',handleHover.bind(0.5));
//nav.addEventListener('mouseout',handleHover.bind(1));

//can also pass an array into the bind method to bind muttiple arguments

//Lecture 10 - Implementing sticky navigation
//scroll event is not very efficient since it is fired very often, and window object has a scroll event attached to it - so we can attach event handler

//dynamically get the top position of the first section from current coordinates
const initalCoords = section1.getBoundingClientRect();

window.addEventListener('scroll',function(e){
  //scroll position is available in window object 
  // console.log(window.scrollX); --> horizontal scroll not need 
  //console.log(window.scrollY); //vertical scroll 
  //console.log(initalCoords.top);
  //scroolY is initially at 0 because the visible point of the viewport and the top of the page are exactly at the same position, as scrolling happens it increases displaying the position between the current point in the viewport top to the top of the page
  
  /* if(window.scrollY > initalCoords.top)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky') */

    //performance might particulary affect in mobile since scroll event is fired too often
});

//Lecture 11 - Sticky navigation better approach
//The Intersection Observer API
//This API allows to observe changes to the way that certain target element interacts another element or the way it intersects the viewport

//called with 2 arguments - observer obj itself will be passed to the call back fn and entries are an array of the threshold entries
/* const observerCallback = function(entries, observer){
  entries.forEach(entry => {
    //entries are populated when we scroll up and down and when the target meets the threshold of intersection with the viewport - isIntersecting is set to false if the threshold is less than 10% and is set to true if it is 10% or more
    console.log(entry);
  })
};

const observerOptions = {
  //root element will be element that we want our target element to intersect
  //can specify null to see the target element intersecting the entire viewport
  //precentage of intersection at which the observer call back will be called - 10%
  root: null,
  //threshold: 0.1,
  //target element intersecting the root element at this threshold the call back fn will be called - no matter whether we are scolling up or down
  threshold: [0,0.2], //0% means callback will be triggered as soon as the target moves out of view or when it enters the view - callback fn is called when threshold is passed when moving into the view and when moving out of the view
  //if set to 1 - then the call back will be called only if 100% of the target is visible in the viewport

};

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(section1); */ //section1 already selected - will be the target

//To calculate the nav bar height dynamically 
const navHeight = nav.getBoundingClientRect().height;

//Now for sticky navigation going to observe the header - already selected

const stickyNav = function(entries){ //observer not used so we can skip that argument
  const entry = entries[0]; //similar to [entry] = entries
  // console.log(entry);

  //if target(header) is not intersecting the root
  if(!entry.isIntersecting)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky')

}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //when 0% of the header is visible then we need the stickyNav callback fn to be executed
  rootMargin: `-${navHeight}px`, // a box of 90 pixel is applied surrounding the target (header element - calculated dynamically )
}); //90 is the height of the nav bar, rem or percentage units doesnt work

headerObserver.observe(header);

//Lecture 12 - Revealing elements as we scroll close to them using Intersection Observer API
//All sections
//const allSections = document.querySelectorAll('.section'); - already initialized

//Reveal sections

const revealSection = function(entries,observer){
  const [entry] = entries;
  //we observing all of the sections with the same observer but need to make only the intersecting section visible
  if(!entry.isIntersecting) return;
  
  entry.target.classList.remove('section--hidden');
  //unobserve events as observer no longer necessary after revealing sections - improves performance
  observer.unobserve(entry.target);
}

//can observe all the 4 sections with a single observer
const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

//Lecture 13 - Images impact the page loading time - Lazy loading images(optimizing images on any page) - improves performance
//As we scroll to one of the low resolution images, the digital images are replaced with the help of data-src attribute value - and also to remove blur effect

//To select all img with property data-src
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  //Replace src(placeholder image) with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  //JS finds and loads the actual image behind the scenes so we can listen for load event - only after loading of image is done the event is triggered and we need to remove the blur filter - this is useful in cases where the internet is very slow and we dont display the loading process of an img instead we still retain the blur effect
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });

  //unobserve - after loading actual imgs
  observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  //we want the images to load little bit before we actually reach them - we dont want to reveal that we are lazy loading
  rootMargin: '200px',
  //loads earlier before the threshold is actually reached - exactly loads 200 px before any of the images is loaded
});

imgTargets.forEach(img => imageObserver.observe(img));

//Lecture 14 - Building a slider component - part 1
//slide selection
//Good practice to keep these funcitonality in their own function - not to bombard the global namespace
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

//reusable fn - with current slide passed
const goToSlide = function(slide){
  //change the value of transform 
  slides.forEach((s,i)=> {
    //first iteration it will be (0-1)*100 = -100 , (1-1)*100 = 0 , (2-1)*100 = 100
    s.style.transform =  `translateX(${(i-slide)*100}%)`;
  }); //-100% , 0, 100 -> when curslide is 1 (active slide should be set with 0%)
  
}

//To put the slides side by side
/* slides.forEach((slide,i)=> {
  slide.style.transform =  `translateX(${i*100}%)`;
}); */
//We can again pass current slide as 0 to the above fn to replace this initial code
// goToSlide(0);

//track the current slide
let curSlide = 0; //starts at 0
//In NodeList also we can read the length property
const maxSlide = slides.length;

//To work with all three
/* const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-600px)';
slider.style.overflow = 'visible'; */

//select the dots container to add the dots
const dotContainer = document.querySelector('.dots');

//need to create one dot for each slide - so loop over the slides
const createDots = function(){
  //slide is not used so can use throw away varible
  slides.forEach(function(_,i){
    //adding the html as the last child
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" 
    data-slide="${i}"> </button>`);
  })
}

//give a background color for currently active slide dot - add the active class - change the dot active representation even when we click on the arrows or mouse keys
const activateDot = function(slide){
  //deactivate all of dots and activate the current one
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  //retrieving an html element that has the class with matching attribute value
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

// Initialization
const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
}

init();

//Moving to the next slide - just change the transform property value
const nextSlide = function(){
  //on click need to move to second slide so increment the slide count and if curclide is the last slide then the next slide must be reset to 0
  //should have control on number of slides
  if(curSlide === maxSlide-1) //length is not 0 based
  {
    curSlide = 0;
  }
  else
    curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide = function(){
  if(curSlide === 0)
  {
    curSlide = maxSlide-1;
  }
  else  
    curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
}

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

//Lecture 15 - Building a slider component - part 2  

//Add a listener for keyboard events to allow sliding using left and right arrow keys
document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  //short circuiting
  e.key === 'ArrowRight' && nextSlide();
});



//createDots();

//event delegation so adding the event handler to a common parent
dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    //can use destructuring
    const {slide} = e.target.dataset; //returns object slide = e.target.dataset.slide
    goToSlide(slide);
    activateDot(slide);
  }
})


//activateDot(0);

//Lecture 16 - Lifecycle DOM Events

//First event - DOMContentLoaded - this is fired as soon as the html is parsed - html downloaded and converted to DOM Tree - and all scripts must be downloaded and executed before this event is fired - doesnt wait for images and other external resources to load 

document.addEventListener('DOMContentLoaded',function(){
  console.log('HTML parsed and DOM tree built! Finished executing Java scripts');

  //can use this block to execute code only after the DOM tree is available - all our code need to be executed only after the DOM is available
  //but we can simply put the script tag at the end of the body - so that the browser finds our script only after parsing the hmtl document - so no need to listen for this event 

})

//second event is the LOAD event that is fired by the window as soon as the html, all the images and external resources such as css files are also loaded 

window.addEventListener('load',function(e){
  console.log('Page fully loaded',e);
})

//beforeunload Event - fired by window immediately before the user leaves the page
 
/* window.addEventListener('beforeunload',function(e){
  e.preventDefault();
  console.log(e);
  e.returnValue = ''; //to display a leaving confirmation - we need to set the return value on the event to an empty string - cant customize the message
}) */

//Lecture 17 - Efficient script loading
//Different ways of loading a Java script in HTML - these attributes change the way in which JS files are fetched and executed - HTML parsing will be paused until the script is fetched and executed - happens usually if script tag is found in the HEAD - so put the script always at the end of the body

//async attribute to script tag - the script is fetched at the same time as the html is parsed in an asynchronous way however the html parsing still stops for script execution if this attribute is used in head. 
//defer attribute to script tag - When deferring the script is fetched asynchronously but still the execution is deferred until the HTML is fully parsed eventhough this is specified in the head. Scripts are executed in the order that is written in the code. If scripts need some third party library that needs to be executed that library need to be executed first before the current script

// When the script tag is added at the end of the body - async or defer will make no sense because fetching and execution happens only after the HTML parsing is completed

//To support old browsers we need to put the script tag at the end of the body - because defer and async are html5 features

