import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleConfirm = null;
  }

  setOnConfirm(callback) {
    this._handleConfirm = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleConfirm) {
        this._handleConfirm();
      }
      this.close();
    });
  }
}
