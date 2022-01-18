// import '/core-js/stable';
// import '/regenerator-runtime/runtime';
import * as model from './Model.js';
import RecipeView from './view/RecipeView.js';
import searchView from './view/searchView.js';
import loadRecipe from './view/searchView.js';
import resultsView from './view/resultsView.js';
import PaginationView from './view/paginationView';
import paginationView from './view/paginationView';
import bookmarkView from './view/bookmarkView.js';

import AddRecipeView from './view/addRecipeView.JS';
import addRecipeView from './view/addRecipeView.js';

const APIKEY = '73a873cf-d0ae-4681-aec7-08bbb823fe7e';

const ids = [];
const recepies = [];
const icon = 'http://localhost:65288/icons.b3083592.svg';

const recipeContainer = document.querySelector('.recipe');
const searchConteiner = document.querySelector('.search__field');
const btnSearchField = document.querySelector('.search__btn');
const searchDisplayer = document.querySelector('.search-results'); // https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//# sourceMappingURL=index.430fc437.js.map

// Calls

///////////////////////////////////////////////////// SEARCH BAR ////////////////////////////////////////////////////////////////////////////
// btnSearchField.addEventListener('click', function(e) {
//     e.preventDefault();
//     const foodMeal = searchConteiner.value;
//     showNavBar(String(foodMeal));
// });

/////////////////////////////////////////////////////// SHOW RECIPE /////////////////////////////////////////////////////////////////////////
const controlRecipe = async function() {
    try {
        //Carch the id of the url
        const id = window.location.hash.slice(1);

        //render the spinner
        RecipeView.renderSpiner();
        //load the recipes
        await model.loadRecipe(id);

        //render the recipes
        RecipeView.render(model.state.recipe);
    } catch (err) {
        RecipeView.renderError(err);
    }
};

const controlSearchResults = async function() {
    try {
        resultsView.renderSpiner();

        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResult(query);

        resultsView.render(model.getSearchResultsPage(1));

        paginationView.render(model.state.search);

        // resultsView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function(goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
};

//////////
const controlServings = function(newServings) {
    model.updateServings(newServings);
    RecipeView.update(model.state.recipe);
};

const controlBookmark = function() {
    if (!model.state.recipe.bookmarked) model.addbookMark(model.state.recipe);
    else model.deleteBookMark(model.state.recipe.id);

    RecipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
    bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
    console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    RecipeView.render(model.state.recipe);
    setTimeout(function() {
        addRecipeView.toggleWindow(), 2500;
    });

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
};

const init = function() {
    RecipeView.addHandlerRender(controlRecipe);

    RecipeView.addHandlerUpdateServing(controlServings);
    RecipeView.addHandlerBookMark(controlBookmark);

    bookmarkView.addHandlerRender(controlBookmarks);

    searchView.addHandlerRender(controlSearchResults);
    paginationView.addHandlerRender(controlPagination);

    addRecipeView.addHandlerUpload(controlAddRecipe);
};

// btnSearchField.addEventListener('click', function(e) {
//     e.preventDefault();
//     const foodMeal = searchConteiner.value;
//     showRecipe(String(foodMeal));
// });

init();