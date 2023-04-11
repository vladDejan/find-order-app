import * as model from "./model.js";
import recipeView from "./Views/recipeView.js";
import searchView from "./Views/searchView.js";
import resultsView from "./Views/resultsView.js";
import View from "./Views/View.js";
import paginationView from "./Views/paginationView.js";
import bookmarksView from "./Views/bookmarksView.js";

import { async } from "regenerator-runtime";
import recipeView from "./Views/recipeView.js";

if (module.hot) {
  module.hot.accept();
}
/////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //Load recipe
    await model.loadRecipe(id);

    //Render
    recipeView.render(model.state.recipe);
    recipeView.markupOverlay();
  } catch (err) {
    recipeView.renderError(
      "We could not find that recipe. Please try another one!"
    );
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResult(query);

    // Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render paginations
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPaginations = function (goToPage) {
  // Render NEW results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW paginations PAGE
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add or Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update bookmark
  recipeView.update(model.state.recipe);
  //Redner bookmark
  bookmarksView.render(model.state.bookmarks);
  bookmarksView.generateSummarum();
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);

  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPaginations);
};
init();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
