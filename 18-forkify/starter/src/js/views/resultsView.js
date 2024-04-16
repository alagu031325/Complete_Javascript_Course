import icons from 'url:../../img/icons.svg' //parcel v2
import previewView from './previewView.js';
import View from './View.js'

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    //The view itself has the default message that it wants to display 
    _errorMessage = "No recipes found for your query! Please Try again... !!"
    //Success msg
    _message = '';

    _generateMarkup(){
        //The data is available in this._data => which is an array and we need to loop over the array
        return this._data.map((result) => previewView.render(result,false)).join('');
    }
}

export default new ResultsView();//There will be only 1 resultsView in the controller

