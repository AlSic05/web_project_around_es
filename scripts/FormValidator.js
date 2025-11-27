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
  button.disabled = hasInvalidInput(inputs);
}

function enableValidation() {
  const profileForm = document.querySelector("#edit-profile-form");
  const newCardForm = document.querySelector("#new-card-form");

  const profileInputs = profileForm.querySelectorAll(".popup__input");
  const profileButton = profileForm.querySelector(".popup__button");

  const newCardInputs = newCardForm.querySelectorAll(".popup__input");
  const newCardButton = newCardForm.querySelector(".popup__button");

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
}

enableValidation();
