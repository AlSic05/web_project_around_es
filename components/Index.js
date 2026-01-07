import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Api, { getAppInfo } from "./Api.js";

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
let cardSection;

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "f259293f-0caf-46de-b937-becf0e8d1736",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

getAppInfo(api)
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardSection = new Section(
      {
        items: cardsData,
        renderer: (cardData) => {
          const card = new Card(
            cardData.name,
            cardData.link,
            "#card-template",
            (name, link) => imagePopup.open({ name, link })
          );
          const cardElement = card.generateCard();
          return card.generateCard();
        },
      },
      "cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log("Error al cargar la aplicación:", err);
  });

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.setEventListeners();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.setEventListeners();

const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  api
    .setUserInfo(formData.name, formData.description)
    .then((updatedUserData) => {
      userInfo.setUserInfo({
        name: updatedUserData.name,
        about: updatedUserData.about,
      });
      profilePopup.close();
    })
    .catch((err) => {
      console.log("Error al actualizar el perfil:", err);
    });
});

profilePopup.setEventListeners();

const cardPopupInstance = new PopupWithForm("#new-card-popup", (formData) => {
  api
    .addCard(formData["place-name"], formData["link"])
    .then((cardData) => {
      const newCard = new Card(
        cardData.name,
        cardData.link,
        "#card-template",
        (name, link) => imagePopup.open({ name, link })
      );

      cardSection.addItem(newCard.generateCard());
      cardPopupInstance.close();
    })
    .catch((err) => {
      console.log("Error al agregar tarjeta:", err);
    });
});
cardPopupInstance.setEventListeners();

buttonEdit.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  inputName.value = currentUser.name;
  inputDescription.value = currentUser.about;
  profilePopup.open();
});

buttonAddCard.addEventListener("click", () => {
  cardPopupInstance.open();
});
