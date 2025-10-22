const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const buttonEdit = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const buttonClose = editPopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = editPopup.querySelector(".popup__input_type_name");
const inputDescription = editPopup.querySelector(
  ".popup__input_type_description"
);
let formElement = document.querySelector(".popup__form");
const cardTemplate = document.getElementById("card-template");
const buttonAddCard = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#new-card-popup");
const buttonCloseCardPopup = cardPopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_active");
  });
  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_card-link");
  renderCard(
    cardNameInput.value,
    cardLinkInput.value,
    document.querySelector(".cards__list")
  );
  evt.target.reset();
  closeModal(cardPopup);
}

buttonEdit.addEventListener("click", handleOpenEditModal);
buttonClose.addEventListener("click", function () {
  closeModal(editPopup);
});
formElement.addEventListener("submit", handleProfileFormSubmit);

buttonAddCard.addEventListener("click", function () {
  openModal(cardPopup);
});
buttonCloseCardPopup.addEventListener("click", function () {
  closeModal(cardPopup);
});
cardPopup
  .querySelector(".popup__form")
  .addEventListener("submit", handleCardFormSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
  renderCard(card.name, card.link, document.querySelector(".cards__list"));
});
