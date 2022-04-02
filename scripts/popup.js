/*************************   general popup functions  *************************/


/** opens the popup window */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  // add a temporary Listeners
  popupElement.addEventListener('click', focusOutPopupHandler);
  document.addEventListener('keydown', escPopupHandler);
}

/** closes the popup window */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// allows the users to close the popup by clicking on the overlay
function focusOutPopupHandler(evt) {
  const openedPopupElement = evt.currentTarget;
  const clickedElement = evt.target;
  // if the focus is outside the popup content
  if (clickedElement == openedPopupElement) {
    closePopup(openedPopupElement);
    // remove the temporary listener from the corresponding function
    openedPopupElement.removeEventListener('click', focusOutPopupHandler);
  }
}

//allows the users to close the popup by pressing the Esc key.
function escPopupHandler(evt) {
  const pressedKey = evt.key;
  if (pressedKey === "Escape") {
    // Find all the popups and make an array of them
    const popupList = Array.from(document.querySelectorAll(".popup"));
    // find the first open Popup Element;
    const openedPopupElement = popupList.find(function (popupElement) {
      return popupElement.classList.contains("popup_opened");
    });
    closePopup(openedPopupElement);
    document.removeEventListener('keydown', escPopupHandler);
  }
}
