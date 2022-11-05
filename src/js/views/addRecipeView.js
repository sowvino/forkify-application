import View from "./view.js";
import icons from 'url:../../img/icons.svg';
import { result } from "lodash-es";


class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _upload = document.querySelector('.upload');
    _message = 'recipe was successfully uploaded';


    /////BTNS
    _btnCloseModal = document.querySelector('.btn--close-modal');
    _btnOpenModal = document.querySelector('.nav__btn--add-recipe');


    constructor() {
        super();
        this._addHandlerShow();
        this._addHandlerclose();
    }

    toggleWindow() {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    };


    _addHandlerShow() {
        this._btnOpenModal.addEventListener('click', this.toggleWindow.bind(this));
    };
    _addHandlerclose() {
        this._btnCloseModal.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })

    };

}
export default new AddRecipeView();