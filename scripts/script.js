
// Выбор элементов
const popupEditElement = document.querySelector('.popup_type_edit');
const popupEditOpenButtonElement = document.querySelector('.profile__button-edit');
const popupEditFormElement = popupEditElement.querySelector('.popup__form');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#profession-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup_type_add');
const popupImageElement = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const signatureElement = document.querySelector('.popup__signature');
const popups = document.querySelectorAll('.popup');
const formAddElement = popupAddElement.querySelector('.popup__form')
const popupAddSaveButton = popupAddElement.querySelector('.popup__button-save');

// функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

// закрытие всех попапов по крестику оверлею и esc
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

// функция закрытия попапа п оклику на esc
function closePopupByClickOnEsc(e) {
  if(e.key === 'Escape'){
    closePopup(document.querySelector('.popup_is-opened'));
 }
}

// функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}

// сохранение внесенный изменений в попап редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditElement);
};

// слушатели попапов
popupAddOpenButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement);
  formAddElement.reset();
  resetErrors(validateConfig, formAddElement)
  resetInputs(validateConfig, formAddElement)
  disableButton(popupAddSaveButton, validateConfig)
});

popupEditOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetErrors(validateConfig, popupEditElement); 
  resetInputs(validateConfig, popupEditElement) 
  
});

popupEditFormElement.addEventListener('submit', handleProfileFormSubmit);


//////////////////////////////////////////////////КАРТОЧКИ/////////////////////////////////////////////////////////////////

const template = document.querySelector('#element-template').content.querySelector('.element');
const cards = document.querySelector('.elements');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');

// создание карточки
function createElement(item) {
  const cardsListElement = template.cloneNode(true);
  const cardsTitle = cardsListElement.querySelector('.element__title');
  const cardsImage = cardsListElement.querySelector('.element__image');
  const likeElement = cardsListElement.querySelector('.element__button-like');
  const trashElement = cardsListElement.querySelector('.element__button-trash');
  const popupImageButtonElement = cardsListElement.querySelector('.element__image-button');
  cardsTitle.textContent = item.name;
  cardsImage.src = item.link;
  cardsImage.alt = item.name;
  popupImageButtonElement.addEventListener('click', function(){
    showImagePopupСontent(item);
  });
  trashElement.addEventListener('click', deliteCard);
  likeElement.addEventListener('click', likeActive);
  return cardsListElement;
}
initialCards.forEach(function(item){
  const element = createElement(item);
  cards.append(element);
});

// добавление новой карточки в dom
function createCardElement(item) {
  const newElement = createElement(item);
  cards.prepend(newElement);
};
// сохранение карточки
function createNewCard(evt) {
  evt.preventDefault();
  createCardElement({name: titleInput.value, link: linkInput.value});
  closePopup(popupAddElement);
};

// обрабобчик клика сохранения карточки
popupAddElement.addEventListener('submit', createNewCard);

// функция отображения контента в попапе изображения
function showImagePopupСontent (item) {
  imageElement.src = item.link;
  signatureElement.textContent = item.name;
  imageElement.alt = item.name;
  openPopup(popupImageElement);
}
// функция смены класса для кнопки лайк
function likeActive(event) {
  event.target.classList.toggle('element__button-like_active');
};
// удаление карточки
function deliteCard(event) {
  event.target.closest('.element').remove();
};
