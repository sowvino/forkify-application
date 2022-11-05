import View from "./view.js";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';
import { result } from "lodash-es";

class BookMarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _messageError = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }

}
export default new BookMarksView();