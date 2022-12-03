const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// Выбор элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = popupElement.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup_type_add');
const popupAddcloseButtonElement = popupAddElement.querySelector('.popup__button-close');
const popupImageElement = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const signatureElement = document.querySelector('.popup__signature');
const popupImageButtonElement = popupImageElement.querySelector('.popup__button-close');

// Открытие попапа редактирования профиля 
const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};
// закрытие попапа редактирования профиля 
const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');
  }

// закрытие попапов по клику на оверлей
const closePopupByClickOnOverlay = function(event) {
  if(event.target === event.currentTarget) {
    closePopup()
    closeAddPopup()
    closeImagePopup()
  };
};

// сохранение внесенный изменений в попап редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};
// открытие попапа добавления карточки
const openAddPopup = function() {
  popupAddElement.classList.add('popup_is-opened');
};

// закрытие попапа добавлния карточки
const closeAddPopup = function() {
  popupAddElement.classList.remove('popup_is-opened');
};

// открытие попапа изображения
function openImagePopup() {
  popupImageElement.classList.add('popup_is-opened');
};
// закрытие попапа изображения
const closeImagePopup = function() {
  popupImageElement.classList.remove('popup_is-opened');
};

// слушатели попапов
popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupAddElement.addEventListener('click', closePopupByClickOnOverlay);
popupImageElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);
popupAddcloseButtonElement.addEventListener('click', closeAddPopup);
popupImageButtonElement.addEventListener('click', closeImagePopup);

//////////////////////////////////////////////////КАРТОЧКИ/////////////////////////////////////////////////////////////////

const template = document.querySelector('#element-template').content.querySelector('.element');
const cards = document.querySelector('.elements');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');

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
  popupImageButtonElement.addEventListener('click', function(){
    imagePopupСontent(item);
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
function create(item) {
  const newElement = createElement(item);
  cards.prepend(newElement);
};
// сохранение карточки
function createNewCard(evt) {
  evt.preventDefault();
  create({name: titleInput.value, link: linkInput.value});
  closeAddPopup();
};

// обрабобчик клика сохранения карточки
popupAddElement.addEventListener('submit', createNewCard);

// функция отображения контента в попапе изображения
function imagePopupСontent (item) {
  imageElement.src = item.link;
  signatureElement.textContent = item.name;
  openImagePopup();
}
// функция смены класса для кнопки лайк
function likeActive(event) {
  event.target.classList.toggle('element__button-like_active');
};
// удаление карточки
function deliteCard(event) {
  event.target.closest('.element').remove();
};