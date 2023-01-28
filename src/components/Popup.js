export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose = (e) => {
    if(e.key === 'Escape'){
      this.close()
   }
  }
  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_is-opened') || e.target.classList.contains('popup__button-close')) {
        this.close();
      }
    })

  }
}