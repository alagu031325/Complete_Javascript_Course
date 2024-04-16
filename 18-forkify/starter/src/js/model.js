import {async} from 'regenerator-runtime';
import { API_URL,RES_PER_PAGE,KEY } from './config'; 
import { AJAX} from './helpers';

//export the state - to be used in the controller - should contain all data about the application 
export const state = {
    recipe : {},
    search: {
        query:'',
        results:[],
        resultsPerPage: RES_PER_PAGE,
        page:1,
    },
    bookmarks: [],

};

const createRecipeObject = function(data){
    //reformat object - so as to have meaningful property names without "_"
    // let recipe = data.data.recipe; --> can use destructuring if we have same property names
    const {recipe} = data.data;

    //construct a new receipe object with the retrieved one 
    //&& short circuits if recipe.key doesnt exists then short circuits else creates a Object and will return the last truthy value - conditionally add properties to object
     return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key}),
    }
    //console.log(state.recipe);
}

//Exported to be called from the controller 
export const loadRecipe = async function(id){
    try{
    //stops code execution only for this async fn that runs in background
    //const res = await fetch(`${API_URL}/${id}`);
    //randomly retrieved id from search query - https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    // const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca10`);


    //json method available on all response objects 
    // data = await res.json();

    //If their is an error in fetching requested data - ok property set to false
    // Printing the api returned error msg
    //if(!res.ok) throw new Error(`${data.message}`) 

    const data = await AJAX(`${API_URL}${id}?key=${KEY}`); //result value of the returned promise is the value returned from getJSON method

    //console.log(data);

    state.recipe = createRecipeObject(data);

    if(state.bookmarks.some(bookmark => bookmark.id === id)){
        //This is set because each time when receipe is loaded from the server the bookmarks will not be there
        state.recipe.bookmarked = true;
    }
    else{
        state.recipe.bookmarked = false;
    }
}
    catch(err){
        //catching the rethrown error from the helper getJSON fn
        console.error(`${err} 🔴🔴🔴`);
        throw err;
    }
};

export const loadSearchResults = async function(query) {
    //https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza -> search query is specified after the "?"
    try{
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        //map returns new array with newly created objects
        state.search.results = data.data.recipes.map(recipe => {
           return { 
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key}),
           }
        });
        state.search.page = 1;
    }
    catch(err){
        console.error(`${err} ❌❌❌`);
        throw err;
    }
};

//Not an async fn because the search results are already loaded at this point 
export const getSearchResultsPage = function(page = state.search.page){
    //to know the current page where the user is currently in
    state.search.page = page;

    //reach into the state and get the data for the page requested - results property is an array of search results so we use slice method
    const start = (page -1) * state.search.resultsPerPage; // 10 is the number of results we want to be displayed in a page
    const end = (page * state.search.resultsPerPage); // 10 and slice doesnt include the last value so we will get 0 to 9 results for page 1
    // console.log(state.search.results);

    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        //Formula used -> newQt = oldQt * newServings /oldServings
        //if doubled then qt also doubled
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    //Also update the servings to the new value 
    state.recipe.servings = newServings;
}

const persistBookmarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks)); //setting a JSON string to a bookmarks key - since localStorage only stores string
}

export const addBookmark = function(recipe){
    //Add bookmark
    state.bookmarks.push(recipe);

    //Mark current recipe as bookmarked
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
}

export const deleteBookmark = function(id){

    //To return the matching bookmark index
    const index = state.bookmarks.findIndex(el => el.id === id);
    //starting from that index remove 1 element
    state.bookmarks.splice(index, 1);
    //Mark current recipe as NOT bookmark
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

const init = function(){
    const storage = localStorage.getItem('bookmarks');
    //convert JSON string back to JS object
    if (storage) state.bookmarks = JSON.parse(storage);
}

init();

//To clear bookmarks
const clearBookmarks = function(){
    localStorage.clear('bookmarks');
}
//Call if needed
//clearBookmarks();

export const uploadRecipe = async function(newRecipe){
    //change the object back to array to use filter method on that - to get only the ingredients that are not empty
    try{
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map( ing => {
        //const ingArr = ing[1].replaceAll(' ','').split(',');
        const ingArr = ing[1].split(',').map(ing => ing.trim());

        if(ingArr.length !== 3) throw new Error('Wrong ingredient Format !! Please use the correct format :)');

        const [quantity, unit, description] = ingArr;

        //Quantity must be a number or null and not a string
        return {quantity: quantity? +quantity : null,unit,description};
    });

    //construct the object that the api accepts
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`,recipe);

    state.recipe = createRecipeObject(data);
    
    addBookmark(state.recipe);
    // console.log(data)
    } catch(err){
        //rejected promise is rethrown
        throw err;
    }

}