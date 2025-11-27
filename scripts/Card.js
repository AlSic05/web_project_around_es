import { openModal } from "./utils.js";

class Card {
  constructor(name, link, templateSelector, modalImagePopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._modalImagePopup = modalImagePopup;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLike(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDelete(cardElement) {
    cardElement.remove();
  }

  _handleImageClick() {
    const modalImage = this._modalImagePopup.querySelector(".popup__image");
    const modalCaption = this._modalImagePopup.querySelector(".popup__caption");

    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalCaption.textContent = this._name;

    openModal(this._modalImagePopup);
  }

  _setEventListeners(cardElement) {
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => this._handleLike(likeButton));
    deleteButton.addEventListener("click", () =>
      this._handleDelete(cardElement)
    );
    cardImage.addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}

export default Card;
