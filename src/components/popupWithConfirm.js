import Popup from "./Popup.js";

export default class popupWithConfim extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._saveButton = this._popup.querySelector('.popup__button-save')
  }

  setCallback(callback) {
    this._handleConfirmationCallback = callback;
  }
  
  renderLoading(isLoading) {
    if(isLoading) {
      this._saveButton.textContent = 'Удаление...'
    }else {
      this._saveButton.textContent = 'Да'
    }
  }
  
  setEventListeners() {
    super.setEventListeners()
    this._saveButton.addEventListener('click', (e) =>{
        e.preventDefault();
        this._handleConfirmationCallback()
    })
  }
}