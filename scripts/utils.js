export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

export function closePopupClick() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) closeModal(popup);
    });
  });
}

export function closePopupEsc() {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) closeModal(openedPopup);
    }
  });
}
