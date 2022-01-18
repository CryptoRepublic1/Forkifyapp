export default class View {
    icon = 'http://localhost:1234/icons.b3083592.svg';
    data;
    render(data) {
        this.data = data;
        const markup = this.generateMurkup();
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    update(data) {
        // compare the new dom with the current dom and change the diferences
        this.data = data;
        const newMarkup = this.generateMurkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElement = Array.from(this.parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElement[i];

            if (!newEl.isEqualNode(curEl) &&
                newEl.firstChild.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
            }
        });
    }

    clear() {
        this.parentElement.innerHTML = '';
    }

    renderSpiner() {
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${this.icon}#icon-loader"></use>
          </svg>
        </div>`;

        this.clear();

        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this.errorMessage) {
        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${this.icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
        this.clear();

        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
    }
}