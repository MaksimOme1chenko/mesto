export class Card {
  constructor(data, templateSelector, showImagePopupСontent) {
    this._title = data.name;
    this._image = data.link;
    this._showImagePopupСontent = showImagePopupСontent
    this._cardsListElement = document.querySelector(templateSelector).content.querySelector('.element');
    this._element = this._cardsListElement.cloneNode(true);
    this._likeElement = this._element.querySelector('.element__button-like');
    this._trashElement = this._element.querySelector('.element__button-trash');
    this._popupImageButtonElement = this._element.querySelector('.element__image-button');
  }
  
  _deleteCard = () => {
    this._element.remove();
    this._element = null
  }

  _likeActive = () => {
    this._likeElement.classList.toggle('element__button-like_active');
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', this._likeActive);
    this._trashElement.addEventListener('click', this._deleteCard);
    this._popupImageButtonElement.addEventListener('click', () =>{ 
      this._showImagePopupСontent(this._title, this._image) 
    });   
  }

  createElement() {
    const cardsImage = this._element.querySelector('.element__image');
    const cardsTitle = this._element.querySelector('.element__title');
    cardsTitle.textContent = this._title;
    cardsImage.src = this._image;
    cardsImage.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}