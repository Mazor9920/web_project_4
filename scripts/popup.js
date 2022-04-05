/*************************   general popup functions  *************************/


/** opens the popup window */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  // add a temporary Listeners:
  popupElement.addEventListener('mousedown', handleFocusOutPopup);
  document.addEventListener('keydown', handleEscPopup);
}

/** closes the popup window */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  // remove temporary Listeners:
  popupElement.removeEventListener('mousedown', handleFocusOutPopup);
  document.removeEventListener('keydown', handleEscPopup);
}

/** allows the users to close the popup by clicking on the overlay */
function handleFocusOutPopup(evt) {
  const openedPopupElement = evt.currentTarget;
  const clickedElement = evt.target;
  // if the focus is outside the popup content
  if (clickedElement == openedPopupElement) {
    closePopup(openedPopupElement);
  }
}

/** allows the users to close an open popup by pressing the Esc key */
function handleEscPopup(evt) {
  const pressedKey = evt.key;
  if (pressedKey === "Escape") {
    const openedPopupElement = document.querySelector(".popup_opened");
    closePopup(openedPopupElement);
  }
}
