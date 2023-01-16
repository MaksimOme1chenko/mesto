import { Card } from "./Card.js";
import { initialCards } from "./constants.js"
import { FormValidator} from "./FormValidator.js"


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
const formAddElement = popupAddElement.querySelector('.popup__form');
const popupAddSaveButton = popupAddElement.querySelector('.popup__button-save');


const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active', 
  errorClass: '.popup__input-error'
}


const validationOnPopupEdit = new FormValidator(validateConfig, popupEditFormElement);
validationOnPopupEdit.enableValidation();

const validationOnPopupAdd = new FormValidator(validateConfig, formAddElement);
validationOnPopupAdd.enableValidation();

// функция открытия попапов
 export function openPopup(popup) {
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
  validationOnPopupAdd.resetInputs()
  
});

popupEditOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validationOnPopupEdit.resetInputs()
  
});

popupEditFormElement.addEventListener('submit', handleProfileFormSubmit);

const cards = document.querySelector('.elements');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');

function createElement(data) {
  const card  = new Card(data, '#element-template', showImagePopupСontent);
  const cardElement = card.createElement()
  cards.prepend(cardElement)
  
  return cardElement
}

initialCards.forEach((data) => {
  createElement(data);
});

function showImagePopupСontent(name, link) {
  imageElement.src = link; 
  imageElement.alt = name; 
  signatureElement.textContent = name; 
  openPopup(popupImageElement); 
}   


// добавление новой карточки в dom
function createCardElement(data) {
  const newElement = createElement(data);
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

