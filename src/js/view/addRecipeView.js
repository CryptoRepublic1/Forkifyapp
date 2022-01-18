import View from './View.js';

class AddRecipeView extends View {
    parentElement = document.querySelector('.upload');

    icon = 'http://localhost:1234/icons.b3083592.svg';

    window = document.querySelector('.add-recipe-window');
    overlay = document.querySelector('.overlay');
    btnOpen = document.querySelector('.nav__btn--add-recipe');
    btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this.addHandlerShow();
        this.addHandlerHide();
    }

    toggleWindow() {
        this.overlay.classList.toggle('hidden');
        this.window.classList.toggle('hidden');
    }

    addHandlerShow() {
        this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerHide() {
        this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this.parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArray = [...new FormData(this)];
            const dataObj = Object.fromEntries(dataArray);
            handler(dataObj);
        });
    }
}

export default new AddRecipeView();