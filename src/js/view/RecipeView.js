import Fraction from 'fractional';
import View from './View';

class RecipeView extends View {
    parentElement = document.querySelector('.recipe');
    errorMessage = 'We could not find thtat recipe.Try another one.';
    icon = 'http://localhost:1234/icons.b3083592.svg';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }
    addHandlerUpdateServing(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--update-servings ');
            if (!btn) return;

            const updateTo = +btn.dataset.updateTo;

            if (+updateTo > 0) handler(+updateTo);
        });
    }
    addHandlerBookMark(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--bookmark');
            console.log(btn);
            if (!btn) return;
            handler();
        });
    }

    generateMurkup() {
        return ` <figure class="recipe__fig">
          <img src="${this.data.image}" alt="${
      this.data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${this.icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${this.icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this.data.servings - 1
              }">
                <svg>
                  <use href="${this.icon}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this.data.servings + 1
              }">
                <svg>
                  <use href="${this.icon}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${this.icon}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${this.icon}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.data.ingredients.map(this.generateMurkupIngredient).join('')}
           
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${this.icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    }
    generateMurkupIngredient(i) {
        return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icon}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                i.quantity ? new Fraction.Fraction(i.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${i.unit}</span>
                ${i.description}
              </div>
            </li>`;
    }
}

export default new RecipeView();