import View from "./View.js";

import icons from "../../Images/icons.svg";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");

  addHandlerRender(handler) {
    ["hashchange"].forEach((ev) => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__choose");
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img
      src="${this._data.image}"
      alt="Tomato"
      class="recipe__img"
    />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
    </div>
    <div class="recipe__user-choose">
      <button class="btn__choose choose__btn--min" data-update-to="${
        this._data.servings - 1
      }">
          <svg class="choose__btn">
          <use href="${icons}#icon-minus-circle"></use>
          </svg>
      </button>
      <span class="preview__input">${this._data.servings}</span>
      <button class="btn__choose choose__btn--plus" data-update-to="${
        this._data.servings + 1
      }">
          <svg class="choose__btn">
          <use href="${icons}#icon-plus-circle"></use>
          </svg>
      </button>
    </div>
    <div class="preview__price">
              <div class="price__quantity">${
                this._data.servings * 4
              }</div><span class="price__unit">€</span>
            </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
  </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? fracty(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
  }
}

export default new RecipeView();
