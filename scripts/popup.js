/*************************   general popup functions  *************************/


/** opens the popup window */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  // add a temporary Listeners:
  popupElement.addEventListener('click', handleFocusOutPopup);
  document.addEventListener('keydown', handleEscPopup);
}

/** closes the popup window */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

/** allows the users to close the popup by clicking on the overlay */
function handleFocusOutPopup(evt) {
  const openedPopupElement = evt.currentTarget;
  const clickedElement = evt.target;
  // if the focus is outside the popup content
  if (clickedElement == openedPopupElement) {
    closePopup(openedPopupElement);
    openedPopupElement.removeEventListener('click', handleFocusOutPopup);
  }
}

/** allows the users to close the popup by pressing the Esc key */
function handleEscPopup(evt) {
  const pressedKey = evt.key;
  if (pressedKey === "Escape") {
    const popupList = Array.from(document.querySelectorAll(".popup"));
    // find the first open popup Element
    const openedPopupElement = popupList.find(function (popupElement) {
      return popupElement.classList.contains("popup_opened");
    });
    closePopup(openedPopupElement);
    document.removeEventListener('keydown', handleEscPopup);
  }
}
