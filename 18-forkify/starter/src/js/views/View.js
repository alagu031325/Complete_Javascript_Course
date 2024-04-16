//exporting the class itself because we are not going to create any instance but we will only use it as a parent class of the other child views
import icons from 'url:../../img/icons.svg' //parcel v2

export default class View{
    _data;

    //JSDOC.app => for info regarding JS documentation
    /**
     * Render the received object to the DOM 
     * @param {Object | Object[]} data The data to be rendered (e.g. recipe) 
     * @param {boolean} [render=true] (optional parameter - If false create markup string instead of 
     *                                  rendering to the DOM)
     * @returns {undefined | string} A markup string is returned if render = false
     * @this {Object} View instance
     * @author Alagu Arunachalam
     */
    render(data, render = true){
        // console.log(data);
        if(!data || (Array.isArray(data) && data.length === 0)) 
            return this.renderError(); //works only for undefined or null, should also check for empty array 

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        //remove existing default message 
        this._clear();
        //Insert the html to its parent element
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
        
    }

    update(data){
        //console.log(data)
        //if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        //once we update the data, the views data must also be the new data
        this._data = data;

        //we create new markup but we dont render it, we use it to compare with the old markup
        const newMarkup = this._generateMarkup();

        //strings are difficult to compare against DOM elements - so convert to DOM objects which is living in memory (newDOM is the virtual DOM - that is not on page but on memory)
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));//retrieves list of all elements in vDOM

        //retrieve all the current elements - returns NodeList - can convert to Array 
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        //compare
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            
            //new element (is equal node) to current element - compares the content of both elements - the parent container also will return false because the children have changed
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
                //property available on all nodes - nodeValue  - value is "null" for parent elements, document etc - but returns content of the text node if the node is a text
                curEl.textContent = newEl.textContent;
            }

            //update changed attributes
            if(!newEl.isEqualNode(curEl)){
                //returns object of attributes that has changed 
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name,attr.value);
                });
            }

        });

    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner(){
        const markup = `
            <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
        // parentEl.innerHTML = '';
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
      }

    //To display error message in the UI - default msg set so that controller has no control over the msg displayed on the view 
    renderError(msg = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${msg}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    //To render success msg
    renderMessage(msg = this._message){
        const markup = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${msg}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

}