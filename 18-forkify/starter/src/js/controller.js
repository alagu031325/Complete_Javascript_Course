//With parcel we can import more than just JS files - all kinds of assests including images

import 'core-js/stable'
import 'regenerator-runtime/runtime'

//importing all named exports 
import * as model from './model.js'
//Importing the default export (receipeView object)
import receipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'

import { MODAL_CLOSE_SEC } from './config.js'

// console.log(icons);//=> new "dist" path to the icon images

//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log("Parcel Working😎");

//parcel - retain the state
/* if(module.hot){
  module.hot.accept();
} */

const controlRecipes = async function(){
  try{

    //To retrieve the hash from the url - if their is no hash in the URL then the spinner keeps loading - because it is trying to find a receipe for empty string - application logic to make the application work 
    const id = window.location.hash.slice(1); //location is the URL and hash returns id prepended with # value
    //console.log(id)
    if(!id) return

    //As we load the receipe render a spinner 
    receipeView.renderSpinner();

    // 0) update results view to  mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    
    //////Lecture 1 : Loading a recipe from forkify API
    //async fn so will return a promise - example of one async fn calling another async fn - doesnt return so no variable needed to store results
    await model.loadRecipe(id);

    //////Lecture 2 : Rendering the receipe - icons are coming from the new "dist" path

    // const {recipe} = model.state;
    receipeView.render(model.state.recipe);

    //All code related to View is moved to corresponding views

  } catch(err){
    receipeView.renderError();
  }
};
//showRecipe();

//////Lecture 3 : Listen for "#<id>"(hash along with #) - hash change event to render recipe based on the hash id

//window.addEventListener('hashchange',showRecipe);

//If we want to open the same URL in a different browser window then the hash doesnt really change - so we also need to listen to load event
//load fired off immediately after the page completes loading
//window.addEventListener('load',showRecipe);

//What if we have ten events for which same showRecipe function needs to be executed - DRY 

const controlSearchResults = async function(){
    try{

      resultsView.renderSpinner();

      //1) Get search query 
      const query = searchView.getQuery();
      //console.log(query);
      if(!query) return;

      //2) Load search results
      await model.loadSearchResults(query);

      //3) Render results
      //console.log(model.state.search.results);
      resultsView.render(model.getSearchResultsPage());

      //4) Render the initial pagination buttons
      paginationView.render(model.state.search);
    }
    catch(err)
    {
      console.error(err);
    }
}

const controlPagination = function(gotToPage){
      //3) Render New results - clears the existing content and renders the new one
      resultsView.render(model.getSearchResultsPage(gotToPage));

      //4) Render the NEW pagination buttons
      paginationView.render(model.state.search);
}

const controlServings = function(newServings){
    //Update the recipe servings (in state)
    model.updateServings(newServings);

    //Update the recipeView - instead of re-rendering
    // receipeView.render(model.state.recipe);
    receipeView.update(model.state.recipe);   
}

const controlAddBookmark = function(){
  //1) Add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else 
    model.deleteBookmark(model.state.recipe.id);
  
  //2) Update recipe view 
  receipeView.update(model.state.recipe);

  //3)Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  //Upload the new Recipe
  try{
    //Show loading spinner
    addRecipeView.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);

    //Render recipe
    receipeView.render(model.state.recipe);

    //Display success message and close the window
    addRecipeView.renderMessage();

    //Render bookmark view - to insert element we use render
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL - pushState(history api) takes 3 arguments - 1st one is state(null), 2nd one is title(''), and 3rd one is the URL - push the id which we want in the URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`);

    //going back to previous page - window.history.back()

    //Close form window
    /* setTimeout(function(){
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000); */

  }catch(err){
    console.error(err, '💥💥💥');
    //error message comes from model and not from view 
    addRecipeView.renderError(err.message);
  }
};

//DOM Events should go into the view
const init = function(){
  //subscribe handler for rendering recipe
  bookmarksView.addHandlerRender(controlBookmarks);
  receipeView.addHandlerRender(controlRecipes);
  receipeView.addHandlerUpdateServings(controlServings);
  receipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();


