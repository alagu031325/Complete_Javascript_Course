//We will also have a parentclass View with couple of methods
//export values so that the controller can use it - if we export the class then we need to create object in the controller and more than one view object could be created so to avoid we will create and export the object from within the view

// import icons from '../img/icons.svg'; --> works in parcel v1 - goes to the parent directory and imports icons from img folder
//In parcel v2 for any static assests like imgs/videos - we should specify url:<path-to-the-file>
import icons from 'url:../../img/icons.svg' //parcel v2

//dont specify path for packages installed from npm
import {Fraction} from 'fractional'; //Fraction constructor method exists inside of Fraction so we use destructuring

import View from './View.js';

class RecipeView extends View{
    //We can have private/protected methods and properties - 
    //Parent element, error msg will be unique to each view
    _parentElement = document.querySelector('.recipe');
    
    //The view itself has the default message that it wants to display 
    _errorMessage = "We couldnt find that recipe. Please try another one !!"
    //Success msg
    _message = '';

    // should be part of public api to be called from controller
    addHandlerRender(handler){
        ['hashchange','load'].forEach(event => {
            window.addEventListener(event,handler);
          })
    }

    addHandlerUpdateServings(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--update-servings');
            if(!btn) return;
            // console.log(btn);
            // "-" converted to camelCase notation 
            const updateTo = +btn.dataset.updateTo;
            //const {updateTo} = btn.dataset; //and then convert to a number
            if (updateTo > 0)  
                handler(updateTo);
        })
    }

    addHandlerAddBookmark(handler){
        //impossible to add a eventlistener to a btn that doesnt exist - when loaded for first time
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--bookmark');
            if(!btn) return;
            handler();
        });
    }

    _generateMarkup(){
        return `
            <figure class="recipe__fig">
                <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
                <h1 class="recipe__title">
                <span>${this._data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings - 1}">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings + 1}">
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
                </div>

                <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                    <svg>
                    <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
                <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill':''}"></use>
                </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">

                ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}

                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                directions at their website.
                </p>
                <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
                >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
                </a>
            </div>
      `;
      
    }

    _generateMarkupIngredient(ingredient){
            return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''}</div>
                <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
                </div>
            </li>
            `
    }

}

//we cant pass any data into this constructor but while calling the "render" method data is passed 
export default new RecipeView(); //nothing else is exported