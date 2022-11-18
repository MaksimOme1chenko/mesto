// Выбор всех нужных элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = popupElement.querySelector('.popup__name');
const jobInput = popupElement.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

// Открытие попапа
const openPopup = function() {
  popupElement.classList.add('popup__open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// закрытие попапа
const closePopup = function() {
    popupElement.classList.remove('popup__open');
  }

// закрытие попапа по клику на оверлей
const closePopupByClickOnOverlay = function(event) {
  if(event.target === event.currentTarget) {
    closePopup()
  }
}
// сохранение внесенный изменений
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);
