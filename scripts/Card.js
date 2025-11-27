class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
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
    const modalImage = modalImagePopup.querySelector(".popup__image");
    const modalCaption = modalImagePopup.querySelector(".popup__caption");

    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalCaption.textContent = this._name;

    openModal(modalImagePopup);
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
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
