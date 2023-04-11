import View from "./View.js";
import icons from "../../Images/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 with other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn__inline pagination__btn--next">
            <svg class="search-icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${curPage + 1}</span>
        </button>`;
    }

    //Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn__inline pagination__btn--prev">
            <svg class="search-icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>`;
    }
    //Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn__inline pagination__btn--prev">
            <svg class="search-icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn__inline pagination__btn--next">
            <svg class="search-icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${curPage + 1}</span>
        </button>
        
      `;
    }
    //Page 1 without pages
    return "";
  }
}

export default new PaginationView();
