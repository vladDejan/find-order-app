import icons from "../../Images/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    //Generisan markup
    const newMarkup = this._generateMarkup();
    //DOM je napravljen
    const newDom = document.createRange().createContextualFragment(newMarkup);
    //Kroz Niz ih stavljamo sve preko fragmenata
    const newElements = Array.from(newDom.querySelectorAll("*"));
    //Kroz Niz ih stavljamo sve preko roditeljskog el
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Svi el kojima pise False su drugaciji nego sto su bili
      // console.log(curEl, newEl.isEqualNode(curEl));
      //Update promena texta
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      //Update promena atributa
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  markupOverlay() {
    const markup = `<div class="overlay main"></div>`;
    this._parentElement.insertAdjacentHTML("beforebegin", markup);
    const overlay =
      this._parentElement.parentElement.querySelector(".overlay.main");
    overlay.addEventListener("click", () => {
      overlay.remove();
      this._clear();
    });
  }

  generateSummarum() {
    let servings = this._data[0].servings * 4;
    let price =
      this._parentElement.parentElement.querySelectorAll(".price__quantity");
    let prices = 0;
    price.forEach(function (el) {
      prices += parseInt(el.innerHTML);
    });

    const markup = `<div class="summarum"><span class="total">Total:</span><span class="price">${prices}</span><span>€</span></div>`;
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  exitOverlay() {
    this._clear();
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
