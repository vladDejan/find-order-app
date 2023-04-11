import View from "./View.js";
import icons from "../../Images/icons.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _summarum = document.querySelector(".summarum");
  _errorMessage = "No orders yet. Find and enjoy in great flavors!";
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
            </a>
            <div class="preview__price">
              <div class="price__quantity">${
                result.servings * 4
              }</div><span class="price__unit">€</span>
            </div>
        </li>
    `;
  }
}

export default new BookmarksView();
