import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

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
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.setEventListeners();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(
        cardData.name,
        cardData.link,
        "#card-template",
        (name, link) => imagePopup.open({ name, link })
      );
      cardSection.addItem(card.generateCard());
    },
  },
  "cards__list"
);
cardSection.renderItems();

const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({ name: formData.name, job: formData.description });
});
profilePopup.setEventListeners();

const cardPopupInstance = new PopupWithForm("#new-card-popup", (formData) => {
  const newCard = new Card(
    formData["place-name"],
    formData["link"],
    "#card-template",
    (name, link) => imagePopup.open({ name, link })
  );
  cardSection.addItem(newCard.generateCard());
});
cardPopupInstance.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  inputName.value = currentUser.name;
  inputDescription.value = currentUser.job;
  profilePopup.open();
});

buttonAddCard.addEventListener("click", () => {
  cardPopupInstance.open();
});
