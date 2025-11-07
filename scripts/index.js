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

const cardPopup = document.querySelector("#new-card-popup");
const cardForm = cardPopup.querySelector(".popup__form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_card-link");
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
const buttonCloseCardPopup = cardPopup.querySelector(".popup__close");
const modalImagePopup = document.querySelector("#image-popup");
const buttonCloseImagePopup = modalImagePopup.querySelector(".popup__close");
const container = document.querySelector(".cards__list");
const profileForm = document.querySelector("#edit-profile-form");
const profileInputs = profileForm.querySelectorAll(".popup__input");
const profileButton = profileForm.querySelector(".popup__button");
const newCardForm = document.querySelector("#new-card-form");
const newCardInputs = newCardForm.querySelectorAll(".popup__input");
const newCardButton = newCardForm.querySelector(".popup__button");

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

function getCardElement() {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener("click", function () {
    const modalImagePopup = document.querySelector("#image-popup");
    const modalImage = modalImagePopup.querySelector(".popup__image");
    const modalCaption = modalImagePopup.querySelector(".popup__caption");
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    openModal(modalImagePopup);
  });

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });
  deleteButton.addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });
  return cardElement;
}

function renderCard(name, link) {
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

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputs) {
  return Array.from(inputs).some((input) => !input.validity.valid);
}

function toggleButtonState(inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
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

buttonCloseImagePopup.addEventListener("click", function () {
  closeModal(modalImagePopup);
});

initialCards.forEach(function (card) {
  console.log(card.name);
  renderCard(card.name, card.link);
});

profileInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(profileForm, input);
    toggleButtonState(profileInputs, profileButton);
  });
});

newCardInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(newCardForm, input);
    toggleButtonState(newCardInputs, newCardButton);
  });
});

toggleButtonState(profileInputs, profileButton);

toggleButtonState(newCardInputs, newCardButton);
