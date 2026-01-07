class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleCardClick,
    handleLikeApi,
    cardId,
    isLiked
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeApi = handleLikeApi;
    this._cardId = cardId;
    this._isLiked = isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _toggleLikeVisual(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDelete(cardElement) {
    cardElement.remove();
  }

  _setEventListeners(cardElement) {
    const cardImage = cardElement.querySelector(".card__image");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    if (this._isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }

    likeButton.addEventListener("click", () => {
      this._handleLikeApi(this._cardId, this._isLiked)
        .then((updatedCard) => {
          this._isLiked = !this._isLiked;
          this._toggleLikeVisual(likeButton);
        })
        .catch((err) => console.log("Error al cambiar like:", err));
    });

    deleteButton.addEventListener("click", () =>
      this._handleDelete(cardElement)
    );

    cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
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
