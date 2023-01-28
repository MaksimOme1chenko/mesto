import Card  from "../components/Card.js";
import { initialCards } from "../components/constants.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import "./index.css"


// Выбор элементов
const popupEditElement = document.querySelector('.popup_type_edit');
const popupEditOpenButtonElement = document.querySelector('.profile__button-edit');
const popupEditFormElement = popupEditElement.querySelector('.popup__form');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="profession"]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup_type_add');
const formAddElement = popupAddElement.querySelector('.popup__form');
const popupAddTitle = formAddElement.querySelector('#title-input');
const popupAddLink = formAddElement.querySelector('#link-input');
const cards = document.querySelector('.elements');


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

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners()

const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
popupAdd.setEventListeners()

const popupEdit = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
popupEdit.setEventListeners()

const profileInfo = new UserInfo({
  nameSelector: profileName, 
  professionSelector: profileJob
})

const initialCardsList = new Section({
  items: initialCards,
  renderer: (data) => {
    initialCardsList.addItem(createElement(data));
}
}, 
cards
);
initialCardsList.renderItems();

function handleProfileFormSubmit(object) {
  profileInfo.setUserInfo(object);
  popupEdit.close()
}

popupEditOpenButtonElement.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.nameSelector;
  jobInput.value = userInfo.professionSelector;
  validationOnPopupEdit.resetInputs()
  popupEdit.open()
});

function handleAddFormSubmit() {
  const newCardElement = {
    link: popupAddLink.value,
    name: popupAddTitle.value
  }
  cards.prepend(createElement(newCardElement))
  popupAdd.close()
  validationOnPopupAdd.resetInputs()
}

popupAddOpenButtonElement.addEventListener('click', () => {
  popupAdd.open()
  formAddElement.reset();
  validationOnPopupAdd.resetInputs()
})


function createElement(data) {
  const card  = new Card(data, '#element-template', showImagePopupСontent);
  const cardElement = card.createElement()
  
  return cardElement
}

function showImagePopupСontent(name, link) {
  popupImage.open(name, link)
}
