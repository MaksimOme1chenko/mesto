import Card  from "../components/Card.js";
import { initialCards } from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import popupWithConfim from "../components/popupWithConfirm.js";
import Api  from "../components/Api.js"
import "./index.css"

const popupEditElement = document.querySelector('.popup_type_edit');
const popupEditOpenButtonElement = document.querySelector('.profile__button-edit');
const popupEditFormElement = popupEditElement.querySelector('.popup__form');
const popupAvatarElement = document.querySelector('.popup_type_avatar')
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="profession"]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup_type_add');
const formAddElement = popupAddElement.querySelector('.popup__form');
const cards = document.querySelector('.elements');
const popupAvatarOpenButtonElement = document.querySelector('.profile__avatar-button');
const avatarSelector = document.querySelector('.profile__avatar')
const popupAvatarFormElement = popupAvatarElement.querySelector('.popup__form')

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active', 
  errorClass: '.popup__input-error'
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'd8cb1cf4-f83f-472d-b3e4-cd4461be9ba2',
    'Content-Type': 'application/json'
  }
})

const validationOnPopupEdit = new FormValidator(validateConfig, popupEditFormElement);
validationOnPopupEdit.enableValidation();

const validationOnPopupAdd = new FormValidator(validateConfig, formAddElement);
validationOnPopupAdd.enableValidation();

const validationOnPopupAvatar = new FormValidator(validateConfig, popupAvatarFormElement)
validationOnPopupAvatar.enableValidation();


const popupDelite = new popupWithConfim('.popup_type_confirm')
popupDelite.setEventListeners()

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners()


const popupAddCard = new PopupWithForm('.popup_type_add', (formData) => {
  popupAddCard.renderLoading(true);
  api
     .uploadNewCard(formData)
     .then((data) => {
      initialCardsList.addItem(data) 
      popupAddCard.close()
     })
     .catch((err) => console.log(err))
     .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners()



const popupEditProfile = new PopupWithForm('.popup_type_edit', (formData) => {
  popupEditProfile.renderLoading(true);
  api
    .changeUserInfo(formData)
    .then((data) => {
      profileInfo.setUserInfo(data)
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditProfile.renderLoading(false));
});
popupEditProfile.setEventListeners()


const popupAvatar = new PopupWithForm('.popup_type_avatar', (formData) => {
  popupAvatar.renderLoading(true);
  api
    .changeUserAvatar(formData)
    .then((data) => {
      profileInfo.setUserInfo(data)
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
})
popupAvatar.setEventListeners()


const profileInfo = new UserInfo(profileName, profileJob, avatarSelector)

const initialCardsList = new Section((cardItem) => createElement(cardItem), cards) 

function showImagePopupСontent(name, link) {
  popupImage.open(name, link)
}

const createElement = (data) => {
  const card = new Card(
    data,
    '#element-template',
    showImagePopupСontent,
    () => {
      popupDelite.setCallback(() => {
        popupDelite.renderLoading(true)
        api
           .deleteCard(data._id)
           .then(() => {
            card.deleteCard();
            popupDelite.close()
           })
           .catch((err) => console.log(err))
           .finally(() => popupDelite.renderLoading(false));
      })
      popupDelite.open()
    },
    () => {
      if (!card.isLiked()) {
        api
           .putLike(data._id)
           .then((data) => {
            card.updateData(data)
            card.updateLikesView()
           })
      } else {
        api
           .deleteLike(data._id)
           .then((data) => {
            card.updateData(data);
            card.updateLikesView();
           })
      }
    },
    userId
  )
  return card.createElement()
}

Promise.all([ api.getUserInfo(), api.getInitialCards()])
.then(([me, cards]) => {
  userId = me._id;
  profileInfo.setUserInfo(me);
  initialCardsList.renderItems(cards)
})
.catch((err) => console.log(err))

let userId


popupAvatarOpenButtonElement.addEventListener('click', () => {
  validationOnPopupAdd
  popupAvatar.open()
})

popupEditOpenButtonElement.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.nameSelector;
  jobInput.value = userInfo.professionSelector;
  validationOnPopupEdit.resetInputs()
  popupEditProfile.open()
});

popupAddOpenButtonElement.addEventListener('click', () => {
  popupAddCard.open();
  validationOnPopupAdd.resetInputs()
})
