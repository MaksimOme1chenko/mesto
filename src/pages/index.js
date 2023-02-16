import Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import PopupWithConfim from "../components/PopupWithConfirm.js";
import Api  from "../components/Api.js"
import "./index.css"
import {
  popupEditOpenButtonElement,
  popupEditFormElement,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupAddOpenButtonElement,
  formAddElement,
  cards,
  popupAvatarOpenButtonElement,
  avatarSelector,
  popupAvatarFormElement,
  validateConfig
} from '../utils/constants.js'


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


const popupDelite = new PopupWithConfim('.popup_type_confirm')
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
      popupEditProfile.close()
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
      popupAvatar.close()
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
})
popupAvatar.setEventListeners()


const profileInfo = new UserInfo(profileName, profileJob, avatarSelector)

const initialCardsList = new Section((cardItem) => generateCard(cardItem), cards) 

function showImagePopupСontent(name, link) {
  popupImage.open(name, link)
}

const generateCard = (data) => {
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
            card.removeCard();
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
           .catch((err) => console.log(err))
      } else {
        api
           .deleteLike(data._id)
           .then((data) => {
            card.updateData(data);
            card.updateLikesView();
           })
           .catch((err) => console.log(err))
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
  validationOnPopupAvatar.resetValidation()
  popupAvatar.open()
})

popupEditOpenButtonElement.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.nameSelector;
  jobInput.value = userInfo.professionSelector;
  validationOnPopupEdit.resetValidation()
  popupEditProfile.open()
});

popupAddOpenButtonElement.addEventListener('click', () => {
  popupAddCard.open();
  validationOnPopupAdd.resetValidation()
})
