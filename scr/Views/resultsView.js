import View from "./View.js";
import icons from "../../Images/icons.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your search! Please try again :)";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    return `
        <li class="preview">
            <a href="#${result.id}" class="preview__link preview__link--active">
            <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
            <div class="preview__bookmark">
              <svg class="nav__icon">
                <use href="${icons}#icon-bookmark${
      result.bookmarked ? "-fill" : ""
    }"></use>
              </svg>
            </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView();
