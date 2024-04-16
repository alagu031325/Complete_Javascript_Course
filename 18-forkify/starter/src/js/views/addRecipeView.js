import icons from 'url:../../img/icons.svg' //parcel v2
import View from './View.js'

class AddRecipeView extends View{
    
    _parentElement = document.querySelector('.upload');
    _message = "Recipe was successfully uploaded :)";

    //selecting window and overlay elements
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');

    //btn to close and add recipes
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super(); //creates "this" keyword
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
         //remove the hidden class from window and overlay 
         this._overlay.classList.toggle('hidden');
         this._window.classList.toggle('hidden');
    }

    //No data needed from controller
    _addHandlerShowWindow(){
        //binding "this" keyword to the current addRecipeView object
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow(){
        //binding "this" keyword to the current addRecipeView object
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            //modern browser api to read all of the form data at once
            //this keyword inside handler fn points to the parent element which is the form itself
            const dataArr = [...new FormData(this)] //FormData constructor takes a form - spread the returned object into an array 

            //new mthd to convert entries to an object 
            const data = Object.fromEntries(dataArr); //opposite of entries method available on arrays

            handler(data);

        });
    }

    //unique to each view called from render method 
    _generateMarkup(){
        

    }
}
//import this object in controller or the main script will never create this object
export default new AddRecipeView();
