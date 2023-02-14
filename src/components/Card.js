

export default class Card {
  constructor(data, templateSelector, showImagePopupСontent, handleConfirmDelete, handleLikeClick, userId) {
    this._data = data
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._selector = templateSelector
    this._handleLikeClick = handleLikeClick
    this._showImagePopupСontent = showImagePopupСontent;
    this._handleConfirmDelete = handleConfirmDelete;
    this._cardsListElement = document.querySelector(this._selector).content.querySelector('.element');
    this._element = this._cardsListElement.cloneNode(true);
    this._likeElement = this._element.querySelector('.element__button-like');
    this._likeContainer = this._element.querySelector('.element__quantity-like')
    this._popupImageButtonElement = this._element.querySelector('.element__image-button');
  }
  
  deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  updateData(newData) {
    this._likes = newData.likes;
  }
  
  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  updateLikesView() {
    this._likeContainer.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeElement.classList.add('element__button-like_active');
    } else {
      this._likeElement.classList.remove('element__button-like_active');
    }
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click',  () => {
      this._handleLikeClick()
    });
    
    this._trashElement.addEventListener('click', () => {
      this._handleConfirmDelete();
    });
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
    this._trashElement = this._element.querySelector('.element__button-trash');
    this._likeContainer.textContent = this._likes.length;

    if(this._ownerId !== this._userId){
      this._trashElement.classList.add('element__button-trash_hidden')
    }
    
    this._setEventListeners();

    return this._element;
  }
}

