import icons from 'url:../../img/icons.svg' //parcel v2
import previewView from './previewView.js';
import View from './View.js'

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    //The view itself has the default message that it wants to display 
    _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
    //Success msg
    _message = '';

    addHandlerRender(handler){
        window.addEventListener('load',handler);
    }

    _generateMarkup(){
        //The data is available in this._data => which is an array and we need to loop over the array
        return this._data.map((bookmark) => previewView.render(bookmark,false)).join('');
    }
}

export default new BookmarksView();

