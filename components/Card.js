class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleCardClick,
    handleLikeApi,
    cardId,
    isLiked,
    handleDeleteCallback
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeApi = handleLikeApi;
    this._cardId = cardId;
    this._isLiked = isLiked;
    this._handleDeleteCallback = handleDeleteCallback;
  }

  _setEventListeners(cardElement, confirmationPopup) {
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    if (this._isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }

    likeButton.addEventListener("click", () => {
      this._handleLikeApi(this._cardId, this._isLiked)
        .then(() => {
          this._isLiked = !this._isLiked;
          likeButton.classList.toggle("card__like-button_is-active");
        })
        .catch((err) => console.log("Error al cambiar like:", err));
    });

    deleteButton.addEventListener("click", () => {
      confirmationPopup.setOnConfirm(() => {
        this._handleDeleteCallback(this._cardId, cardElement);
      });
      confirmationPopup.open();
    });

    cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard(confirmationPopup) {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._setEventListeners(cardElement, confirmationPopup);

    return cardElement;
  }
}

export default Card;
