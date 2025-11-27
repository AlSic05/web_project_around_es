const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://concepto.de/wp-content/uploads/2018/08/Picos-de-montana.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://cdn0.geoenciclopedia.com/es/posts/8/0/0/montanas_8_orig.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://res.cloudinary.com/dmcvdsh4c/image/upload/v1711699300/iceebookImage/ciencia/geologia/geologia-montanas-formacion-misterios_iz66pg.webp",
  },
  {
    name: "Latemar",
    link: "https://concepto.de/wp-content/uploads/2018/08/monta%C3%B1a-clima-min-e1533762913759.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://content.nationalgeographic.com.es/medio/2025/01/18/himalaya_68c32f8b_250118135441_1280x720.webp",
  },
  {
    name: "Lago di Braies",
    link: "https://humanidades.com/wp-content/uploads/2018/11/montan%CC%83as-e1543190116289-800x400.jpg",
  },
];

const cardPopup = document.querySelector("#new-card-popup");
const cardForm = cardPopup.querySelector(".popup__form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");
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
const newCardForm = document.querySelector("#new-card-form");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function closePopupClick() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
}

function closePopupEsc() {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) closeModal(openedPopup);
    }
  });
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

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card(
    cardNameInput.value,
    cardLinkInput.value,
    "#card-template"
  );
  container.prepend(newCard.generateCard());
  evt.target.reset();
  closeModal(cardPopup);
}

buttonEdit.addEventListener("click", handleOpenEditModal);
buttonClose.addEventListener("click", () => closeModal(editPopup));
formElement.addEventListener("submit", handleProfileFormSubmit);

buttonAddCard.addEventListener("click", () => openModal(cardPopup));
buttonCloseCardPopup.addEventListener("click", () => closeModal(cardPopup));
cardForm.addEventListener("submit", handleCardFormSubmit);
buttonCloseImagePopup.addEventListener("click", () =>
  closeModal(modalImagePopup)
);

initialCards.forEach((cardData) => {
  const card = new Card(cardData.name, cardData.link, "#card-template");
  container.prepend(card.generateCard());
});

closePopupClick();
closePopupEsc();
