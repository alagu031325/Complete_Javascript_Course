import icons from 'url:../../img/icons.svg' //parcel v2
import View from './View.js'

class PaginationView extends View{
    
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            //find out which btn is clicked - we use closest to get the closest parent since the user can either click on span or svg or we use the common btn parent element
            const btn = e.target.closest('.btn--inline');

            //Handling the click outside of a btn but inside the pagination div element
            if(!btn) return;

            //convert string to a number 
            const gotToPage = +btn.dataset.goto;
            handler(gotToPage);
        })
    }

    //unique to each view called from render method 
    _generateMarkup(){
        const currentPage = this._data.page;
        //this._data => is the entire search results object coming from the controller 
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage) ; //find number of pages by diving the total results by number of results per page
        //console.log(numPages);

        //Page 1, and there are multiple pages
        if(currentPage === 1 && numPages > 1 ){
            //and there are other pages
            return `
                <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage+1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;

        } 

        //Last page - what if numPages is 1 so additional check needed
        if(currentPage === numPages && numPages > 1){
            //and there are other pages
            return `
                <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage-1}</span>
                </button>
            `;
        }

        //Other page in the middle where both prev and next buttons needs to be visible
        if(currentPage < numPages){
            return `
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage-1}</span>
                </button>
                <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage+1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        //Page 1, and there are NO other pages
        return '';

    }
}

export default new PaginationView();
