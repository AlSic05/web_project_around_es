class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState() {
    if (this._inputList.some((input) => !input.validity.valid)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );

      inputElement.classList.remove(this._inputErrorClass);

      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
      }
    });

    this._toggleButtonState();
  }
}

export default FormValidator;
