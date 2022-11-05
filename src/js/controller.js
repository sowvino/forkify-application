import * as model from './model.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
///import icons for svg 

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { update } from 'lodash-es';
if (module.hot) {
  module.hot.accept();
}


///////////////////////////////////////
//////rendering the spinner


////fetching the API
const controlRecipe = async function () {
  try {
    ///id from window location
    const id = window.location.hash.slice(1);

    ///if no id clause
    if (!id) return;
    recipeView.renderSpinner();

    ///rendering marked for the  search recipe
    resultsView.update(model.getSearchResults());
    ///rendering the update of bookMark
    bookMarkView.update(model.state.bookmarks);
    //loading the recipe
    await model.loadRecipe(id);
    //const { recipe } = model.state;
    ///Rendering the recipe
    recipeView.render(model.state.recipe);

  }
  catch (err) {

    recipeView.renderError();
    console.error(`${err}🔥🔥🔥`);
  }
};


const controlSearchResults = async function () {
  try {
    ///1)getting the query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    //2)load the query
    await model.LoadSearchResults(query);
    console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResults());
    ////Pagination View
    paginationView.render(model.state.search);

  }
  catch (err) {
    console.error(`${err}🔥🔥🔥`);
  }
};
const controlPaginationView = function (goToPage) {
  ///Rendering the new page
  resultsView.render(model.getSearchResults(goToPage));
  ////Pagination View
  paginationView.render(model.state.search);

}
const controlServings = function (updateServing) {
  model.updateServings(updateServing);
  ///Rendering the recipe
  recipeView.update(model.state.recipe);
}

const controlAddbookMark = function () {
  //Add /remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //updating the recipeview
  recipeView.update(model.state.recipe);

  //Rendering the view of bookmark
  bookMarkView.render(model.state.bookmarks);
}



///rendering the BookMark View

const controlBookmark = function () {
  bookMarkView.render(model.state.bookmarks);
}

const controlRecipeUpload = async function (newRecipe) {
  try {
    ///Uploading the recipe
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    ///rendering the newRecipe
    recipeView.render(model.state.recipe);

    ///Rendering the success msg
    addRecipeView.renderSuccess();

    ///bookmarking the recipe
    bookMarkView.render(model.state.bookmarks);

    //window history for id reload
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    ///close form window
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }
      , MODAL_CLOSE_SEC * 1000);

  }
  catch (err) {
    console.error('🔥', err);
    addRecipeView.renderError(err.message);
  }
}


const newfeature = function () {
  console.log('welcome to the application!');
}

const init = function () {
  bookMarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdate(controlServings);
  recipeView.addHandlerBookMarkClick(controlAddbookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPaginationView);
  addRecipeView.addHandlerUpload(controlRecipeUpload);
  newfeature();
}
init();
//window.addEventListener('hashchange', showReceipe);
//window.addEventListener('load', showReceipe);