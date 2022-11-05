import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import { result } from "lodash-es";

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    };
    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        ///Page 1 and other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupButtonNext(curPage);
        }
        //other page
        if (curPage < numPages) {
            return this._generateMarkupButton(curPage);
        }
        if (curPage === numPages) {
            return this._generateMarkupButtonPrev(curPage);
        }
        return '';
    }
    _generateMarkupButtonPrev(curPage) {
        return `<button data-goto="${curPage - 1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> page ${curPage - 1}</span>
          </button>`
    }
    _generateMarkupButtonNext(curPage) {
        return ` <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`
    }
    _generateMarkupButton(curPage) {
        return `<button data-goto="${curPage - 1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> page ${curPage - 1}</span>
      </button>
      <button data-goto=" ${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>`;
    }




}
export default new PaginationView();