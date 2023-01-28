import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmit) {
    super(popupSelector)
    this._formSubmit = formSubmit
    this._inputs = this._popup.querySelectorAll('.popup__input')
    this._form = this._popup.querySelector('.popup__form')
  }
  _getInputValues() {
    const formValues = {};

    this._inputs.forEach(input => {
      formValues[input.name] = input.value
    })

    return formValues
  }  

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }
}