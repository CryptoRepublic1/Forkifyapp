import View from './View';

class ResultsView extends View {
    parentElement = document.querySelector('.results');
    icon = 'http://localhost:1234/icons.b3083592.svg';

    generateMurkup() {
        return this.data.map(result => this.generateMarkupPreview(result)).join('');
    }

    generateMarkupPreview(results) {
        return `
        
      <li class="preview">
        <a class="preview__link ${results.id}" href="#${results.id}">
          <figure class="preview__fig">
            <img src="${results.image}" alt="${results.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
            <div class="preview__user-generated ${results.key ? '' : 'hidden'}">
              <svg>
              <use href="${icon}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
    }
}

export default new ResultsView();