class SearchView {
    parentElement = document.querySelector('.search');
    icon = 'http://localhost:1234/icons.b3083592.svg';

    getQuery() {
        const query = this.parentElement.querySelector('.search__field').value;
        this.clearInput();
        return query;
    }
    clearInput() {
        this.parentElement.querySelector('.search__field').value = '';
    }
    addHandlerRender(handler) {
        this.parentElement.addEventListener('submit', function(e) {
            e.preventDefault(handler());
        });
    }
}

export default new SearchView();