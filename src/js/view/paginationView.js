import View from './View';

class PaginationView extends View {
    parentElement = document.querySelector('.pagination');
    icon = 'http://localhost:1234/icons.b3083592.svg';

    addHandlerRender(handler) {
        this.parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = Number(btn.dataset.goto);
            handler(goToPage);
        });
    }

    generateMurkup() {
        const currentPage = this.data.page;

        const numPages = Math.ceil(
            this.data.results.length / this.data.resultsPerPage
        );

        //page 1 , and other pages
        if (currentPage === 1 && numPages > 1) {
            return `<button data-goto="${
        currentPage + 1
      }"class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${this.icon}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        // Last page
        if (currentPage === numPages && numPages > 1) {
            return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${this.icon}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
        }
        // midle pages
        if (currentPage < numPages) {
            return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${this.icon}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${this.icon}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
        }

        return '';
    }
}

export default new PaginationView();