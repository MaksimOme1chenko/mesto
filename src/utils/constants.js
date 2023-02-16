
const popupEditElement = document.querySelector('.popup_type_edit');
export const popupEditOpenButtonElement = document.querySelector('.profile__button-edit');
export const popupEditFormElement = popupEditElement.querySelector('.popup__form');
const popupAvatarElement = document.querySelector('.popup_type_avatar')
export const nameInput = document.querySelector('input[name="name"]');
export const jobInput = document.querySelector('input[name="profession"]');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__profession');
export const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup_type_add');
export const formAddElement = popupAddElement.querySelector('.popup__form');
export const cards = document.querySelector('.elements');
export const popupAvatarOpenButtonElement = document.querySelector('.profile__avatar-button');
export const avatarSelector = document.querySelector('.profile__avatar')
export const popupAvatarFormElement = popupAvatarElement.querySelector('.popup__form')

export const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active', 
  errorClass: '.popup__input-error'
}