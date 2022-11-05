import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX } from './helper.js';
export const state = {
    recipe: {},
    search: {
        query: {},
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        servings: recipe.servings,
        title: recipe.title,
        sourceUrl: recipe.source_url,
        cookingtime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;

        console.log(state.recipe);
    }
    catch (err) {
        console.error(`${err}🔥🔥🔥`);
        throw err;
    }
};

export const LoadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        console.log(data);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                image: rec.image_url,
                publisher: rec.publisher,
                title: rec.title,
                ...(rec.key && { key: rec.key }),
            };
        });
        state.search.page = 1;
    }
    catch (err) {
        throw err;
    }
};
export const getSearchResults = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;  //0
    const end = page * state.search.resultsPerPage;  //9
    return state.search.results.slice(start, end);
}
export const updateServings = function (newServing) {
    state.recipe.ingredients.forEach(ing =>
        ing.quantity = (ing.quantity * newServing) / state.recipe.servings);
    state.recipe.servings = newServing;
}
const persistBookmark = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

}

export const addBookmark = function (recipe) {
    //bookmarking the recipe
    state.bookmarks.push(recipe);
    //current recipe is bookmark then display 
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmark();

}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmark();
}
const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearBookMark = function () {
    localStorage.clear('bookmarks');
};
//clearBookMark();

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());
                if (ingArr.length !== 3)
                    throw new Error('Ingredients format is wrong 😒😒.Please try correct format');
                const [quantity, unit, description] = ingArr;

                return {
                    quantity: quantity ? +quantity : null, unit, description
                };
            });
        const recipe = {
            id: newRecipe.id,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            servings: +newRecipe.servings,
            title: newRecipe.title,
            cooking_time: +newRecipe.cookingTime,
            ingredients,
        }
        console.log(recipe);

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    }
    catch (err) {
        throw err;
    }

}