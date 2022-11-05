import View from "./view.js";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';
import { result } from "lodash-es";

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _messageError = 'No recipes found for your query please try again 😒!!';
    _message = '';

    _generateMarkup() {
        console.log(this._data);
        return this._data.map(result => previewView.render(result, false)).join('');
    }

}
export default new ResultsView();