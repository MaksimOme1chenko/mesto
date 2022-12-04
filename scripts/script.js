// спасибо вам большое за ревью, особенно за объяснение универсальной функии, было очень интересно почитать и разобраться <3
// не знаю почему у вас лайки становятся невидимыми, у меня все корректно отображается
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
const popupEditElement = document.querySelector('.popup_type_edit');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = popupEditElement.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#profession');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const popupAddOpenButtonElement = document.querySelector('.profile__button-add');
const popupAddElement = document.querySelector('.popup_type_add');
const popupImageElement = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const signatureElement = document.querySelector('.popup__signature');
const popups = document.querySelectorAll('.popup');

// функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// закрытие всех попапов по крестику и оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})
// функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
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
});
popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

formElement.addEventListener('submit', handleProfileFormSubmit);


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
function create(item) {
  const newElement = createElement(item);
  cards.prepend(newElement);
};
// сохранение карточки
function createNewCard(evt) {
  evt.preventDefault();
  create({name: titleInput.value, link: linkInput.value});
  closePopup(popupAddElement);
  evt.target.reset();
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