//Doesnt render any data but it will give us the content of the input field - related to DOM so included in separate view (also separate part in the UI)

class SearchView {
    _parentElement = document.querySelector('.search');

    //get the query - value of the input field - 
    getQuery(){
        const query = this._parentElement.querySelector('.search__field').value;
        //console.log(query);
        this._clearInput();
        return query;
    }

    //clear input field after submitting
    _clearInput(){
        this._parentElement.querySelector('.search__field').value = '';
    }

    //Listen for events such as submitting the form or clicking the search button to call the handler
    addHandlerSearch(handler){ //publisher
        //we will listen on parent element so that it works no matter if the user clicks the search button or trys to submit form by clicking enter
        this._parentElement.addEventListener('submit',(e)=>{
            //when we submit a form we need to prevent default load action - so we cant call handler directly 
            e.preventDefault();
            handler();
        });
    }
} 

export default new SearchView();